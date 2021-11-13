class ToysGridComponent {
    constructor() {
        this.state = {
            loading: false,
            toys: []
        }
        this.init();
    }

    init = () => {

        this.state.loading = true;
        this.initFetch();
        this.htmlElement = document.createElement('div');
        this.render();
    }

    initFetch = () => {
        API.fetchToys(
            (toys) => {
                this.state.loading = false;
                this.saveToys(toys);
            },
        (err) => {
                alert(err);
                this.state.loading = false;
                this.render();
            }

        );
    }

saveToys = (toys) => {
    this.state.toys = toys;
    this.state.loading = false;
    this.render();
}

render = () => {
    const {loading, toys} = this.state;
    if(loading) {
        this.htmlElement.innerHTML = `<div class=text-center"><img src="assets/loading.gif"/></div>`;
    } else if(toys.length > 0){
       this.htmlElement.innerHTML = '';
        const toysElements = toys
        .map(x => new ToyCardComponent(x))
        .map(x => x.htmlElement);
        this.htmlElement.append(...toysElements);
    } else {
        this.htmlElement.innerHTML = `Šiuo metu žaislų nėra`;
    }
}




}
