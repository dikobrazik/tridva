/* eslint-disable no-console */
'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Header} from '@/components/Header';
import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {checkoutActions, loadPickupPointsAction} from '@/lib/features/checkout';
import {useAppDispatch} from '@/lib/hooks';
import {lastSelectedPickupPointIdStorage} from '@/shared/utils/local-storage/storages';
import {PickupPoint} from '@/types/geo';
import {useRouter} from 'next/navigation';
import * as ol from 'ol';
import {singleClick} from 'ol/events/condition';
import {Select} from 'ol/interaction';
import 'ol/ol.css';
import VectorSource from 'ol/source/Vector';
import {useEffect, useRef, useState} from 'react';
import {ClusterLayer, LayerBuilder} from './builders/LayerBuilder';
import {MapBuilder} from './builders/MapBuilder';
import {PickupPointsBuilder} from './builders/PickupPointsBuilder';
import {selectedPickupPointStyle} from './helpers';
import {zoomOnCluster} from './utils/zoomOnCluster';
import {Circle} from 'ol/geom';

export default function PickupPointsPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [selectedPickupPoint, setSelectedPickupPoint] = useState<PickupPoint>();

    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<ol.Map | null>(null);
    const selectClickRef = useRef<Select | null>(null);
    const vectorSourceRef = useRef<VectorSource | null>(null);

    useEffect(() => {
        dispatch(loadPickupPointsAction())
            .unwrap()
            .then(pickupPoints => {
                vectorSourceRef.current?.addFeatures(PickupPointsBuilder.build(pickupPoints));
            });
    }, []);

    useEffect(() => {
        if (ref.current && !mapRef.current) {
            const map = MapBuilder.build(ref.current);
            const layer = LayerBuilder.build();

            mapRef.current = map;

            map.addLayer(layer);

            vectorSourceRef.current = layer.getSource()!.getSource();

            map.on('click', async event => {
                const clusterLayer = event.map.getAllLayers().find(ClusterLayer.isClusterLayer);

                if (!clusterLayer) throw new Error('No cluster layers on map');

                const cluster = await clusterLayer.getCluster(event.pixel);

                if (cluster && cluster.isCluster()) zoomOnCluster(event, cluster);
            });

            selectClickRef.current = new Select({
                condition: singleClick,
                style: feature => {
                    if (feature.get('selected')) {
                        return selectedPickupPointStyle;
                    }
                },
                filter: feature => feature.get('features').length === 1,
            });

            map.addInteraction(selectClickRef.current);

            selectClickRef.current.on('select', function (e) {
                for (const deselected of e.deselected) {
                    deselected.set('selected', false);
                }

                if (e.selected.length) {
                    const feature = e.selected[0].get('features')[0];

                    e.selected[0].set('selected', true);

                    map.getView().animate({
                        center: (feature.getGeometry() as Circle).getCenter(),
                        duration: 300,
                    });

                    setSelectedPickupPoint(feature.get('pickupPoint'));
                } else {
                    setSelectedPickupPoint(undefined);
                }
            });
        }
    }, []);

    const onSelect = () => {
        if (selectedPickupPoint) {
            dispatch(checkoutActions.setSelectedPickupPointId(selectedPickupPoint.id));
            lastSelectedPickupPointIdStorage.set(selectedPickupPoint.id);
            router.back();
        }
    };

    return (
        <Column>
            <Header withBackArrow>Пункты выдачи</Header>

            <div ref={ref} style={{width: '100%', height: 'calc(100vh - 116px)'}}></div>

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
