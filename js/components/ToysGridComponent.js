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

    initFetch = () => setTimeout(() => {
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
    }, 1000);

    saveToys = (toys) => {
        this.state.toys = toys;
        this.htmlElement.className = 'row g-3';
        this.render();
    }

    deleteToy = (id) => {
        API.deleteToy(
            id,
            () => API.fetchToys(this.saveToys, alert),
            alert);
        //  this.render();
    }


    wrapInColumn = (element) => {
        const column = document.createElement('div');
        column.className = 'col-12 col-sm-6 col-lg-3 col-xl-4';
        column.appendChild(element);
        return column;
    }

    render = () => {
        const { loading, toys } = this.state;
        if (loading) {
            this.htmlElement.innerHTML = `<div class=text-center"><img src="assets/loading.gif"/></div>`;
        } else if (toys.length > 0) {
            this.htmlElement.innerHTML = '';
            const toysElements = toys
                .map(({ id, ...props }) => new ToyCardComponent({
                    ...props,
                    onDelete: () => this.deleteToy(id)
                }))
                .map(x => x.htmlElement)
                .map(this.wrapInColumn);
            this.htmlElement.append(...toysElements);
        } else {
            
            this.htmlElement.innerHTML = `<h2 class="text-danger">Šiuo metu žaislų nėra</h2>`;
        }
    }




}
