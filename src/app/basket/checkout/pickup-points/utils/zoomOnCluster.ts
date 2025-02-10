import {MapBrowserEvent} from 'ol';
import {ClusterFeature} from '../builders/LayerBuilder';

export const zoomOnCluster = (event: MapBrowserEvent<UIEvent>, cluster: ClusterFeature) => {
    const extent = cluster.getGeometry()!.getExtent(); // Получаем границы кластера

    event.map.getView().fit(extent, {
        duration: 500,
        padding: [50, 50, 50, 50],
        minResolution: Math.max(5, (event.map.getView().getResolution() ?? 0) - 30),
    });
};
