class ToysGridComponent{
    constructor() {
        this.state = {
            
        }
        this.init();
    }

    init = () => {
        this.htmlElement = document.createElement('div');
        this.htmlElement.innerHTML = 'Aš esu ToysGridComponent';
    }
}
