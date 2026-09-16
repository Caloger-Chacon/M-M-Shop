import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('M&M Shop')
    .items([
      S.listItem()
        .title('Cartera')
        .child(
          S.documentList()
            .title('Carteras')
            .filter('_type == "product"')
        ),
      S.listItem()
        .title('Configuración del Sitio')
        .child(
          S.documentList()
            .title('Configuración')
            .filter('_type == "siteSettings"')
        ),
      S.divider()
    ])  