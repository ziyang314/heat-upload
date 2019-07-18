import Heatmap from './heatmap';

new Heatmap({
    workerSrc: './wk.js',
    uploadUrl: 'http://localhost:3001/interface?interface_name=hitdata&interface_params=',
});
