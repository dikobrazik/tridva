import {Map, View} from 'ol';
import {defaults} from 'ol/interaction';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import {OSM} from 'ol/source';

export class MapBuilder {
    public static build(target: HTMLElement) {
        return new Map({
            target,
            interactions: defaults({dragPan: true, mouseWheelZoom: true}),
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([50.20626, 53.22545]),
                zoom: 11,
            }),
        });
    }
}
