'use client';

import {Header} from '@/components/Header';
import {Column} from '@/components/layout/Column';
import * as ol from 'ol';
import {Circle} from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {fromLonLat, toLonLat} from 'ol/proj';
import {default as OSM} from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import {useEffect, useRef} from 'react';
import {defaults} from 'ol/interaction';
import 'ol/ol.css';

export default function PickupPointsPage() {
    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<ol.Map | null>(null);

    useEffect(() => {
        if (ref.current && !mapRef.current) {
            const circleGeometry = new Circle(fromLonLat([50.20626, 53.22545]), 50);

            const circleFeature = new ol.Feature({
                geometry: circleGeometry,
            });

            circleFeature.setStyle(
                new Style({
                    renderer(coordinates, state) {
                        const [[x, y], [x1, y1]] = coordinates;
                        const ctx = state.context;
                        const dx = x1 - x;
                        const dy = y1 - y;
                        const radius = Math.sqrt(dx * dx + dy * dy);

                        const innerRadius = 0;
                        const outerRadius = radius * 1.4;

                        // const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
                        // gradient.addColorStop(0, 'rgba(255,0,0,0)');
                        // gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)');
                        // gradient.addColorStop(1, 'rgba(255,0,0,0.8)');
                        ctx.beginPath();
                        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                        ctx.fillStyle = 'rgba(255,0,0,1)';
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(x, y, radius * 0.9, 0, 2 * Math.PI, true);
                        ctx.arc(x, y, radius * 0.8, 0, 2 * Math.PI, true);
                        ctx.fillStyle = 'rgba(255,255,255,1)';
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(x, y, radius * 0.7, 0, 2 * Math.PI, true);
                        ctx.arc(x, y, radius * 0.6, 0, 2 * Math.PI, true);
                        ctx.fillStyle = 'rgba(255,0,0,1)';
                        ctx.fill();
                    },
                }),
            );

            mapRef.current = new ol.Map({
                target: ref.current,
                interactions: defaults({dragPan: true, mouseWheelZoom: true}),
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    new VectorLayer({
                        source: new VectorSource({
                            features: [circleFeature],
                        }),
                    }),
                ],
                view: new ol.View({
                    center: fromLonLat([50.20626, 53.22545]),
                    zoom: 18,
                    // zoom: 11,
                }),
            });

            mapRef.current.on('singleclick', function (evt) {
                const coordinate = evt.coordinate;
                console.log(toLonLat(coordinate));
            });

            let currZoom = mapRef.current.getView().getZoom();

            mapRef.current.on('moveend', function () {
                const newZoom = mapRef.current.getView().getZoom();
                if (currZoom != newZoom) {
                    console.log('zoom end, new zoom: ' + newZoom);
                    currZoom = newZoom;
                }
            });
        }
    }, []);

    return (
        <Column>
            <Header withBackArrow>Пункты выдачи</Header>

            <div ref={ref} style={{width: '100%', height: '550px'}}></div>
        </Column>
    );
}
