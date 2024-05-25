'use client';

import {Header} from '@/components/Header';
import {Column} from '@/components/layout/Column';
import {checkoutActions, loadPickupPointsAction} from '@/lib/features/checkout';
import {useAppDispatch} from '@/lib/hooks';
import {PickupPoint} from '@/types/geo';
import * as ol from 'ol';
import {Circle} from 'ol/geom';
import {Select, defaults} from 'ol/interaction';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';
import {fromLonLat, toLonLat} from 'ol/proj';
import {default as OSM} from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {useEffect, useRef, useState} from 'react';
import {pickupPointCircleSelectStyle, pickupPointCircleStyle} from './helpers';
import {click} from 'ol/events/condition';
import {Drawer} from '@/components/Drawer';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {Icon} from '@/components/Icon';
import {Button} from '@/components/Button';
import {useRouter} from 'next/navigation';

export default function PickupPointsPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [selectedPickupPoint, setSelectedPickupPoint] = useState<PickupPoint>();

    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<ol.Map | null>(null);
    const selectClickRef = useRef<Select | null>(null);

    const onPickupPointsLoaded = (pickupPoints: PickupPoint[]) => {
        const features = pickupPoints.map(pickupPoint => {
            const circleGeometry = new Circle(
                fromLonLat([Number(pickupPoint.longitude), Number(pickupPoint.latitude)]),
                150,
            );

            const circleFeature = new ol.Feature({
                geometry: circleGeometry,
                pickupPoint,
            });

            circleFeature.setStyle(pickupPointCircleStyle);

            return circleFeature;
        });

        mapRef.current?.addLayer(
            new VectorLayer({
                source: new VectorSource({
                    features,
                }),
            }),
        );
    };

    useEffect(() => {
        dispatch(loadPickupPointsAction()).then(({payload, meta}) => {
            if (meta.requestStatus === 'fulfilled') {
                onPickupPointsLoaded(payload);
            }
        });

        if (ref.current && !mapRef.current) {
            mapRef.current = new ol.Map({
                target: ref.current,
                interactions: defaults({dragPan: true, mouseWheelZoom: true}),
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new ol.View({
                    center: fromLonLat([50.20626, 53.22545]),
                    zoom: 11,
                }),
            });

            mapRef.current.on('singleclick', function (evt) {
                const coordinate = evt.coordinate;
                console.log(toLonLat(coordinate));
            });

            let currZoom = mapRef.current.getView().getZoom();

            mapRef.current.on('moveend', function () {
                const newZoom = mapRef.current?.getView().getZoom();
                if (currZoom != newZoom) {
                    console.log('zoom end, new zoom: ' + newZoom);
                    currZoom = newZoom;
                }
            });

            selectClickRef.current = new Select({
                condition: click,
                style: pickupPointCircleSelectStyle,
                toggleCondition: function (mbe) {
                    return mbe.type == 'click';
                },
            });

            mapRef.current.addInteraction(selectClickRef.current);

            selectClickRef.current.on('select', function (e) {
                if (e.selected.length) {
                    if (selectClickRef.current?.getFeatures().getLength() > 1) {
                        selectClickRef.current?.getFeatures().removeAt(0);
                    }
                    setSelectedPickupPoint(e.selected[0].get('pickupPoint'));
                } else {
                    setSelectedPickupPoint(undefined);
                }
            });
        }
    }, []);

    const onSelect = () => {
        dispatch(checkoutActions.setSelectedPickupPointId(selectedPickupPoint.id));
        router.back();
    };

    return (
        <Column>
            <Header withBackArrow>Пункты выдачи</Header>

            <div ref={ref} style={{width: '100%', height: '450px'}}></div>

            <Drawer
                isOpen={Boolean(selectedPickupPoint?.id)}
                onClose={() => {
                    setSelectedPickupPoint(undefined);
                    selectClickRef.current?.getFeatures().clear();
                }}
                withoutBlackout
            >
                <Column gap={6}>
                    <Column gap={2}>
                        <Text weight={600} size={16}>
                            {selectedPickupPoint?.address}
                        </Text>
                        <Text weight={400} size={10} color="#303234A3">
                            Пункт выдачи
                        </Text>
                    </Column>

                    <Row gap={1} alignItems="center">
                        <Icon name="informationCircle" />
                        <Text weight={500} size={10} color="#4FDE38">
                            Доставим бесплатно
                        </Text>
                    </Row>

                    <Row gap={1}>
                        <Icon name="phone" />
                        <Text weight={500} size={10}>
                            {selectedPickupPoint?.phone}
                        </Text>
                    </Row>

                    <Row gap={1}>
                        <Icon name="calendar" />
                        <Text weight={500} size={10}>
                            Срок хранения заказа 5 дней
                        </Text>
                    </Row>

                    <Button onClick={onSelect}>Забрать отсюда</Button>
                </Column>
            </Drawer>
        </Column>
    );
}
