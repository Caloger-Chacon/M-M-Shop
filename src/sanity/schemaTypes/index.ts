import { type SchemaTypeDefinition } from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = [
  {
    name: 'product',
    title: 'Cartera',
    type: 'document',
    fields: [ 
      {
        name: 'name',
        title: 'Nombre',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }, 
      {
        name: 'slug',
        title: 'Slug (URL)',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'category',
        title: 'Categoría',
        type: 'string',
        options: {
          list: [
            { title: 'Tote', value: 'Tote' },
            { title: 'Crossbody', value: 'Crossbody' },
            { title: 'Clutch', value: 'Clutch' },
            { title: 'Hobo', value: 'Hobo' },
            { title: 'Satchel', value: 'Satchel' },
            { title: 'Bandolera', value: 'Bandolera' },
            { title: 'Bucket', value: 'Bucket' },
            { title: 'Mini', value: 'Mini' },
            { title: 'Cartera', value: 'Cartera' },
            { title: 'Bolso', value: 'Bolso' },
          ],
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Precio (EUR)',
        type: 'number',
        validation: (Rule) => Rule.required().min(0),
      },
      {
        name: 'featured',
        title: 'Producto Destacado',
        type: 'boolean',
        description: 'Activa para mostrar en la sección "Destacadas" de la home',
        initialValue: false,
      },
      {
        name: 'onSale',
        title: 'En oferta',
        type: 'boolean',
        description: 'Activa el precio de oferta',
      },
      {
        name: 'salePrice',
        title: 'Precio de oferta (EUR)',
        type: 'number',
        validation: (Rule) => Rule.min(0),
        hidden: ({ document }) => !document?.onSale,
      },
      {
        name: 'saleEndDate',
        title: 'Fecha fin de la oferta',
        type: 'datetime',
        hidden: ({ document }) => !document?.onSale,
      },
      {
        name: 'description',
        title: 'Descripción',
        type: 'text',
        rows: 3,
      },
      {
        name: 'mainImage',
        title: 'Imagen Principal',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'gallery',
        title: 'Galería de Imágenes',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          layout: 'grid',
        },
      },
      {
        name: 'features',
        title: 'Características',
        type: 'object',
        fields: [
          { name: 'material', title: 'Material', type: 'string' },
          { name: 'dimensions', title: 'Dimensiones', type: 'string' },
          { name: 'compartments', title: 'Compartimentos', type: 'number' },
          { name: 'closure', title: 'Tipo de Cierre', type: 'string' },
        ],
      },
      {
        name: 'variants',
        title: 'Variantes (Colores)',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'color',
                title: 'Color',
                type: 'string',
                options: {
                  list: [
                    { title: 'Negro', value: 'Negro' },
                    { title: 'Terracota', value: 'Terracota' },
                    { title: 'Beige', value: 'Beige' },
                    { title: 'Camel', value: 'Camel' },
                    { title: 'Burdeos', value: 'Burdeos' },
                    { title: 'Rosa', value: 'Rosa' },
                    { title: 'Verde', value: 'Verde' },
                    { title: 'Dorado', value: 'Dorado' },
                    { title: 'Plateado', value: 'Plateado' },
                    { title: 'Azul marino', value: 'Azul marino' },
                    { title: 'Azul claro', value: 'Azul claro' },
                    { title: 'Café', value: 'Café' },
                    { title: 'Blanco', value: 'Blanco' },
                    { title: 'Gris', value: 'Gris' },
                    { title: 'Rojo', value: 'Rojo' },
                    { title: 'Marrón', value: 'Marrón' },
                  ],
                },
              },
              {
                name: 'colorHex',
                title: 'Código de Color (Hex)',
                type: 'string',
                description: 'Ejemplo: #C67B5C',
              },
              {
                name: 'stock',
                title: 'Stock Disponible',
                type: 'number',
                validation: (Rule) => Rule.min(0),
              },
              {
                name: 'sku',
                title: 'SKU (Código de producto)',
                type: 'string',
              },
            ],
          },
        ],
      },
      {
        name: 'isActive',
        title: 'Activo',
        type: 'boolean',
        description: 'Desactivar para ocultar del catálogo',
        initialValue: true,
      },
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'category',
        media: 'mainImage',
      },
    },
  },
  {
    name: 'siteSettings',
    title: 'Configuración del Sitio',
    type: 'document',
    fields: [
      {
        name: 'whatsappNumber',
        title: 'Número de WhatsApp',
        type: 'string',
        description: 'Número de WhatsApp para contacto directo con clientes',
      },
      {
        name: 'address',
        title: 'Dirección',
        type: 'string',
      },
      {
        name: 'hours',
        title: 'Horario de atención',
        type: 'string',
      },
      {
        name: 'exchangeRate',
        title: 'Tasa BCV (Bs/EUR)',
        type: 'number',
        description: 'Tasa del día para calcular precios en Bolívares',
      },
      {
        name: 'pagoMovil',
        title: 'Datos de Pago Móvil',
        type: 'object',
        fields: [
          { name: 'bank', title: 'Banco', type: 'string' },
          { name: 'bankCode', title: 'Código de Banco', type: 'string' },
          { name: 'idNumber', title: 'Cédula', type: 'string' },
          { name: 'phone', title: 'Teléfono', type: 'string' },
        ],
      },
      {
        name: 'binance',
        title: 'Datos de Binance',
        type: 'object',
        fields: [
          { name: 'email', title: 'Email / Pay ID', type: 'string' },
          { name: 'walletAddress', title: 'Wallet Address', type: 'string' },
          { name: 'network', title: 'Red', type: 'string', initialValue: 'BSC (BEP20)' },
        ],
      },
    ],
  },
]