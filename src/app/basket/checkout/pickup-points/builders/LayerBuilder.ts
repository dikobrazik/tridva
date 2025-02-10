import {Circle, Point} from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import {Cluster} from 'ol/source';
import VectorSource from 'ol/source/Vector';
import {clusterStyleFunction} from '../helpers';
import {Pixel} from 'ol/pixel';
import Layer from 'ol/layer/Layer';
import {Feature} from 'ol';

export class ClusterLayer extends VectorLayer<Cluster> {
    static isClusterLayer(layer: Layer) {
        return layer instanceof ClusterLayer;
    }

    async getCluster(pixel: Pixel): Promise<ClusterFeature | undefined> {
        return (await super.getFeatures(pixel))?.[0] as ClusterFeature | undefined;
    }
}

export class ClusterFeature extends Feature {
    isCluster() {
        return this.get('features').length > 1;
    }
}

export class LayerBuilder {
    public static build() {
        const clusterSource = new Cluster({
            source: new VectorSource({}),
            distance: 30,
            minDistance: 1,
            // @ts-expect-error неправильные типы в картах
            geometryFunction: function (feature) {
                const type = feature.getGeometry()?.getType();

                if (type === 'Circle') {
                    return new Point((feature.getGeometry() as Circle).getCenter());
                }

                return null;
            },
            createCluster: function (point, features) {
                return new ClusterFeature({geometry: point, features});
            },
        });

        return new ClusterLayer({
            source: clusterSource,
            style: clusterStyleFunction,
        });
    }
}
