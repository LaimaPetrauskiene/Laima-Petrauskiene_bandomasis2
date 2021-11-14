class ToyCardComponent {

    static USD_EUR = 0.87;

    constructor(props) {
        this.props = props;

        this.init();
    }

    fortmatBadge = (content) => 
    `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success ms-4">${content}</span>`;

  formatPrice = () => {
    const {
      price: { currency, amount },
      discount: { type, amount: value }
    } = this.props;
    const priceInEuro = currency === '$' ? amount * ToyCardComponent.USD_EUR : amount;
        const formatedPrice = Math.round(100 * priceInEuro) / 100 + ' €';



    let finalPrice;
    let discountBadge = '';
    switch (type) {
      case 'amount':
        finalPrice = parseInt(formatedPrice) - value;
        discountBadge = this.fortmatBadge(`-${value} €`);
        console.log(finalPrice);
        break;
      case 'toFixed':
        finalPrice = value;
        break;
      case 'percentage':
        finalPrice = Math.round(100 * parseInt(formatedPrice) * (1 - value / 100)) / 100;
        discountBadge = this.fortmatBadge(`-${value} %`);
        break;
    }

    return `
    <span class="d-inline-flex">
      <span class="text-decoration-line-through fw-light pe-2 text-danger">${amount} ${currency}</span>
      <strong class="text-success position-relative">${finalPrice} € ${discountBadge}</strong>
    </span>`;
  }

    formatAgeRestriction = () => {
        const { ageRestrictions } = this.props;
        return ageRestrictions
          ? `<div>Age: ${ageRestrictions.from}+</div>`
          : `<div class="text-white user-select-none">fake text</div>`;
      }

    init = () => {
        const { title, imgSrc } = this.props;
        

        this.htmlElement = document.createElement('article');
        this.htmlElement.className = "card p-3 shadow";
        this.htmlElement.innerHTML = `
        <img src="${imgSrc}" />
        <ul>
            <li>
            <h2 class="text-danger">${title}</h2>
            </li>
            
        <hr>
            <li>
            <span><strong>${this.formatAgeRestriction()}</strong></span>
            </li>
            <li>
            <span><strong>Price:</strong>
            ${this.formatPrice()}</span>
            </li>
           
        </ul>`;
    }
}