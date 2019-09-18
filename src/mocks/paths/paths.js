class NavItem{};
let ni = new NavItem();

const testimonials = (() => {
    let ni = new NavItem();
    ni.path = '/testimonials';
    ni.isNestedRootPath = true;
    ni.name = 'testimonials';
    ni.text = 'Отзывы';
    return ni;
})();

const shortTerm = (() => {
    let ni = new NavItem();
    ni.path = '/short-term';
    ni.name = 'short-term';
    ni.text = 'Краткосрочные';
    ni.paths = [
        (() => {
            let ni = new NavItem();
            ni.path = '/general';
            ni.name = 'general';
            ni.text = 'Общие';
            return ni;
        })(),
        (() => {
            let ni = new NavItem();
            ni.path = '/intensive';
            ni.name = 'intensive';
            ni.text = 'Интенсивные';
            return ni;
        })(),
        (() => {
            let ni = new NavItem();
            ni.path = '/business';
            ni.name = 'business';
            ni.text = 'Бизнес';
            return ni;
        })(),
    ];
    return ni;
})();

const longTerm = (() => {
    let ni = new NavItem();
    ni.path = '/short-term';
    ni.name = 'short-term';
    ni.text = 'Краткосрочные';
    ni.paths = [
        (() => {
            let ni = new NavItem();
            ni.path = '/general';
            ni.name = 'general';
            ni.text = 'Общие';
            return ni;
        })(),
        (() => {
            let ni = new NavItem();
            ni.path = '/intensive';
            ni.name = 'intensive';
            ni.text = 'Интенсивные';
            return ni;
        })(),
        (() => {
            let ni = new NavItem();
            ni.path = '/business';
            ni.name = 'business';
            ni.text = 'Бизнес';
            return ni;
        })(),
    ];
    return ni;
})();
const accommodation = (() => {
        let ni = new NavItem();
        ni.path = '/accommodation';
        ni.name = 'accommodation';
        ni.text = 'Проживание';
        ni.paths = [
            (() => {
                let ni = new NavItem();
                ni.path = '/accommodation';
                ni.name = 'accommodation';
                ni.text = 'Все варианты';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/prices';
                ni.name = 'prices';
                ni.text = 'Цены';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/school-residence';
                ni.name = 'school-residence';
                ni.text = 'Школьные Апартаменты';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/host-family';
                ni.name = 'host-familyy';
                ni.text = 'Гостевая Семья';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/hotel';
                ni.name = 'hotel';
                ni.text = 'Отели';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/camp';
                ni.name = 'camp';
                ni.text = 'Лагерь';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/family';
                ni.name = 'family';
                ni.text = 'Всей семьей';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/self';
                ni.name = 'self';
                ni.text = 'Самостоятельно';
                return ni;
            })(),
        ];

        return ni;
})();

const paths = {
    mainTree:
        [
            (() => {
                let ni = new NavItem();
                ni.path = '/home';
                ni.name = 'home';
                ni.text = 'Без Границ';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/courses';
                ni.name = 'courses';
                ni.text = 'Курсы';
                ni.paths = [
                    (() => {
                        let ni = new NavItem();
                        ni.path = '/courses';
                        ni.name = 'courses';
                        ni.text = 'Все курсы';
                        return ni;
                    })(),
                    testimonials,
                    shortTerm,
                    (() => {
                        let ni = new NavItem();
                        ni.path = '/business';
                        ni.name = 'business';
                        ni.text = 'Бизнес Английский';
                        return ni;
                    })(),
                    (() => {
                        let ni = new NavItem();
                        ni.path = '/family';
                        ni.name = 'family';
                        ni.text = 'Для всей семьи';
                        return ni;
                    })(),

                    (() => {
                        let ni = new NavItem();
                        ni.path = '/long-term';
                        ni.name = 'long-term';
                        ni.text = 'Долгосрочные';
                        return ni;
                    })(),
                    (() => {
                        let ni = new NavItem();
                        ni.path = '/certs';
                        ni.name = 'certs';
                        ni.text = 'Сертификаты';
                        return ni;
                    })(),
                    (() => {
                        let ni = new NavItem();
                        ni.path = '/teacher';
                        ni.name = 'teacher';
                        ni.text = 'На преподавателя';
                        return ni;
                    })(),
                ];
                return ni;
            })(),
            accommodation,
            (() => {
                let ni = new NavItem();
                ni.path = '/services';
                ni.name = 'services';
                ni.text = 'Поддержка';
                return ni;
            })(),
            (() => {
                let ni = new NavItem();
                ni.path = '/about';
                ni.name = 'about';
                ni.text = 'О нас';
                return ni;
            })(),
        ],
    contact: (() => {
        let ni = new NavItem();
        ni.path = '/contact';
        ni.name = 'contact';
        ni.text = 'Связаться';
        return ni;
    })(),
    prices: (() => {
        let ni = new NavItem();
        ni.path = '/prices';
        ni.name = 'prices';
        ni.text = 'Цены';
        return ni;
    })(),
    testimonials: testimonials,
};

export { paths };