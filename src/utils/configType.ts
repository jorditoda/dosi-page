export type TemplateConfig = {
    name: string;
    seo: {
        title: string;
        description: string;
    };
    logo: string;
    /** Imatge per a Open Graph. Ha de ser raster (PNG/JPG), no SVG. */
    ogImage: string;
    /** Text alternatiu de l'og:image. */
    ogImageAlt: string;
    theme: string;
    backgroundGrid: boolean;
    forceTheme: boolean;
    showThemeSwitch: boolean;
    googlePlayLink?: string | undefined;
    appStoreLink?: string | undefined;
    app: {
        seo: {
            title: string;
            description: string;
        };
    };
    termsAndConditions: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    privacyPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    cookiesPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    footer: {
        links: {
            title: string;
            href: string;
        }[];
        legalLinks: {
            termsAndConditions: boolean;
            privacyPolicy: boolean;
            cookiesPolicy: boolean;
        };
        socials?: {
            facebook?: string | undefined;
            instagram?: string | undefined;
            twitter?: string | undefined;
        } | undefined;
    };
    topNavbar: {
        cta?: string | undefined;
        links: {
            title: string;
            href: string;
        }[];
        hideGooglePlay?: boolean | undefined;
        hideAppStore?: boolean | undefined;
    };
    appBanner?: {
        id?: string | undefined;
        title: string;
        subtitle: string;
        screenshots: string[];
    } | undefined;
    home: {
        seo: {
            title: string;
            description: string;
        };
        header: {
            id?: string | undefined;
            headline: string;
            subtitle: string;
            headlineMark?: number[] | undefined;
            screenshots: string[];
            usersDescription?: string | undefined;
        };
        testimonials?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                name: string;
                /** Rol que li dona credibilitat. */
                role?: string | undefined;
                comment: string;
            }[];
        } | undefined;
        partners?: {
            id?: string | undefined;
            title: string;
            logos: string[];
        } | undefined;
        faq?: {
            id?: string | undefined;
            title: string;
            qa: {
                question: string;
                answer: string;
            }[];
        } | undefined;
        howItWorks?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            steps: {
                image: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        features?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                /** Key from src/components/icons (not a path: they are inline SVGs). */
                icon: import("../components/icons").IconName;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        showcase?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            items: {
                image: string;
                caption: string;
                note: string;
            }[];
        } | undefined;
        /**
         * Real example doses, one per topic. The cards are taken verbatim from
         * `docs/dosi/cards.json`: nothing here is invented.
         */
        samples?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            doses: {
                /** Topic id (topics.json). */
                topic: string;
                topicName: string;
                /** Topic label colors (topics.json): color at 14 % and label text. */
                topicColor: string;
                topicLabelColor: string;
                cards: {
                    concept: string;
                    hook: string;
                    source: string;
                }[];
            }[];
        } | undefined;
        /**
         * Bloc de preus: comparison entre el pla gratis i Pro, sense preus
         * decidits (vegeu §0 del pla).
         */
        /** Prova tècnica: fets verificables en lloc de testimonis. */
        proof?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            items: {
                icon: import("../components/icons").IconName;
                title: string;
                text: string;
            }[];
        } | undefined;
        pricing?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            /**
             * Comparison between the free plan and Pro. No prices: they are
             * not decided yet (see §0 of the plan).
             */
            plans: {
                name: string;
                features: {
                    label: string;
                    /** "Sí" / "No" / a short value ("1-2 de prova"). Text, never color alone. */
                    value: string;
                }[];
                highlight?: boolean | undefined;
            }[];
            /** CTA below the table. Must say the same as the store buttons. */
            actionText?: string | undefined;
        } | undefined;
    };
}