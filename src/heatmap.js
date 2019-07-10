class Heatmap {
    constructor(options) {
        // todo
        this.options = options;
    }

    set(val) {
        console.info(this.options);
        Object.assign(this.options, val);
    }
}

const a = new Heatmap({ aa: 'a' });
