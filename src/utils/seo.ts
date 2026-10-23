/**
 * Dades estructurades JSON-LD.
 *
 * Font de veritat: `docs/dosi/`. No s'hi posa versió ni SO mínims perquè
 * encara no es saben, ni `aggregateRating` perquè inventar una valoració pot
 * ser sancionat per Google. `downloadUrl` i `installUrl` només surten si hi
 * ha enllaç real a les botigues (s'afegiran el dia del llançament).
 */

import type {TemplateConfig} from "./configType";

export const APP = {
  name: "Dosi",
  price: "0", // Descàrrega gratuïta (model freemium; el Pro es subscriu a l'app)
  category: "EducationApplication",
  iosCategory: "Education",
} as const;

interface JsonLdOptions {
  config: TemplateConfig;
    /** Canonical URL of the page, already absolute. */
  url: string;
    /** FAQ from the home page; only included on that page. */
  faq?: TemplateConfig["home"]["faq"];
    /** Marks if the page is a legal policy, for the BreadcrumbList. */
  breadcrumb?: { name: string }[];
}

export function buildJsonLd({ config, url, faq, breadcrumb }: JsonLdOptions) {
  const image = new URL(config.ogImage, url).href;
  const base = url.replace(/\/[^/]*$/, "/").replace(/\/+$/, "/");

  const graph: Record<string, unknown>[] = [
    {
      "@type": "SoftwareApplication",
      "@id": `${base}#app`,
      name: APP.name,
      applicationCategory: APP.category,
      description: config.seo.description,
      url: base,
      image,
      // Només hi han de ser amb enllaç real a les botigues.
      ...(config.googlePlayLink
        ? { downloadUrl: config.googlePlayLink }
        : {}),
      ...(config.appStoreLink ? { installUrl: config.appStoreLink } : {}),
      offers: {
        "@type": "Offer",
        price: APP.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      featureList: config.home.features?.cards.map((c) => c.title),
      screenshot: config.home.showcase?.items.map((i) => ({
        "@type": "ImageObject",
        contentUrl: new URL(i.image, base).href,
        caption: i.caption,
      })),
      author: {
        "@type": "Organization",
        name: config.name,
        url: base,
      },
    },
  ];

  if (faq?.qa?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.qa.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  if (breadcrumb?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inici", item: base },
        ...breadcrumb.map((b, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: b.name,
          item: url,
        })),
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}