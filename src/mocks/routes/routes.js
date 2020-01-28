/**
 * @typedef import('../../typedefs/routes.js').wob203rRoutes
 */

/**
* @type routeItem
*/
let testimonials = {
    path: '/testimonials',
    name: 'testimonials',
    order: 2,
    intl: 'Отзывы'
}


/**
 * @type wob203rRoutes
 */
let routes = {
    contact: {
        path: '/contact',
        name: 'contact',
        order: 1,
        intl: 'Связаться'
    },
    prices: {
        path: '/prices',
        name: 'prices',
        order: 1,
        intl: 'Цены'
    },
    testimonials: testimonials,
    mainTree: {
        home: {
            selfNav: {
                path: '/home',
                name: '',
                order: 5,
                intl: 'Без Границ'
            }
        },
        services: {
            selfNav: {
                path: '/services',
                name: 'services',
                order: 20,
                intl: 'Поддержка'
            }
        },
        about: {
            selfNav: {
                path: '/about',
                name: 'about',
                order: 25,
                intl: 'О нас'
            }
        },
        courses: {
            selfNav: {
                path: '/courses',
                name: 'courses',
                order: 10,
                intl: 'Курсы'
            },
            testimonials: {
                selfNav: testimonials,
            },
            all: {
                path: '/courses',
                name: 'all',
                order: 10,
                intl: 'Все курсы'
            },
            shortTerm: {
                selfNav: {
                    path: '/courses/short-term',
                    name: 'shortTerm',
                    order: 15,
                    intl: 'Краткосрочные'
                },
                business: {
                    path: '/courses/short-term/business',
                    name: 'business',
                    order: 10,
                    intl: 'Бизнес'
                },
                flexi: {
                    path: '/courses/short-term/flexi',
                    name: 'flexi',
                    order: 10,
                    intl: 'Универсальные'
                },
                intensive: {
                    path: '/courses/short-term/intensive',
                    name: 'intensive',
                    order: 10,
                    intl: 'Интенсив'
                }
            },
            business: {
                selfNav: {
                    path: '/courses/business',
                    name: 'business',
                    order: 15,
                    intl: 'Бизнес'
                },
                general: {
                    path: '/courses/business/general',
                    name: 'general',
                    order: 10,
                    intl: 'Общие'
                },
                intensive: {
                    path: '/courses/business/intensive',
                    name: 'intensive',
                    order: 20,
                    intl: 'Интесивные'
                },
                target: {
                    path: '/courses/business/target',
                    name: 'target',
                    order: 30,
                    intl: 'Целевые'
                },
                // trades: {
                //     selfNav: {
                //         path: '/courses/business/trades',
                //         name: 'trades',
                //         order: 5,
                //         intl: 'По профессиям'
                //     },
                //     accountant: {
                //         path: '/courses/business/trades/accountant',
                //         name: 'accountant',
                //         order: 10,
                //         intl: 'Бухгалтер'
                //     },
                //     manager: {
                //         path: '/courses/business/trades/manager',
                //         name: 'manager',
                //         order: 15,
                //         intl: 'Руководитель'
                //     }
                // }
            },
            family: {
                selfNav: {
                    path: '/courses/family',
                    name: 'family',
                    order: 20,
                    intl: 'Для всей семьи'
                },
                teenagers: {
                    path: '/courses/family/teenagers',
                    name: 'teenagers',
                    order: 10,
                    intl: 'Подростки'
                },
                summerCamp: {
                    path: '/courses/family/summer-camp',
                    name: 'summerCamp',
                    order: 20,
                    intl: 'Летний лагерь'
                },
                kids: {
                    path: '/courses/family/kids',
                    name: 'kids',
                    order: 30,
                    intl: 'Дети и малыши'
                },
                fullFamily: {
                    path: '/courses/family/full-family',
                    name: 'fullFamily',
                    order: 40,
                    intl: 'Для всей семьи'
                }
            },
            longTerm: {
                selfNav: {
                    path: '/courses/long-term',
                    name: 'longTerm',
                    order: 25,
                    intl: 'Долгосрочные'
                }
            },
            certs: {
                selfNav: {
                    path: '/courses/certs',
                    name: 'certs',
                    order: 30,
                    intl: 'Сертификаты'
                }
            },
            teachers: {
                selfNav: {
                    path: '/courses/teachers',
                    name: 'teachers',
                    order: 35,
                    intl: 'На преподавателя'
                }
            },
        },
        accommodation: {
            selfNav: {
                path: '/accommodation',
                name: 'accommodation',
                order: 15,
                intl: 'Проживание'
            },
            all: {
                path: '/accommodation',
                name: 'all',
                order: 5,
                intl: 'Все варианты'
            },
            prices: {
                path: '/accommodation/prices',
                name: 'prices',
                order: 10,
                intl: 'Цены'
            },
            schoolResidence: {
                path: '/accommodation/school-residence',
                name: 'schoolResidence',
                order: 15,
                intl: 'Школьная резиденция'
            },
            hostFamily: {
                path: '/accommodation/host-family',
                name: 'hostFamily',
                order: 20,
                intl: 'Гостевая семья'
            },
            camp: {
                path: '/accommodation/camp',
                name: 'camp',
                order: 25,
                intl: 'Детский лагерь'
            },
            family: {
                path: '/accommodation/family',
                name: 'family',
                order: 30,
                intl: 'Всей семьей'
            },
            hotel: {
                path: '/accommodation/hotel',
                name: 'hotel',
                order: 35,
                intl: 'Отель'
            },
            self: {
                path: '/accommodation/self',
                name: 'self',
                order: 40,
                intl: 'Самостоятельно'
            },
        }
    },
};

export { routes };