// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || "master",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images"
    }
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Homepage",
        path: "src/content",
        format: "json",
        match: { include: "home" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero Title" },
          { type: "string", name: "heroSubtitle", label: "Hero Subtitle", ui: { component: "textarea" } },
          { type: "image", name: "heroImage", label: "Hero Image" },
          { type: "string", name: "ctaText", label: "CTA Button Text" },
          { type: "string", name: "ctaLink", label: "CTA Button Link" },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Image" }
            ]
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials",
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "object",
                name: "items",
                label: "Testimonial Items",
                list: true,
                fields: [
                  { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
                  { type: "string", name: "author", label: "Author" },
                  { type: "string", name: "role", label: "Role" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "service",
        label: "Services",
        path: "src/content",
        format: "json",
        match: { include: "services" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "sectionTitle", label: "Section Title" },
          { type: "string", name: "sectionSubtitle", label: "Section Subtitle", ui: { component: "textarea" } },
          {
            type: "object",
            name: "services",
            label: "Service Cards",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "icon", label: "Icon (emoji)" }
            ]
          }
        ]
      },
      {
        name: "gallery",
        label: "Gallery",
        path: "src/content",
        format: "json",
        match: { include: "gallery" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "sectionTitle", label: "Section Title" },
          { type: "string", name: "sectionSubtitle", label: "Section Subtitle", ui: { component: "textarea" } },
          {
            type: "object",
            name: "images",
            label: "Gallery Images",
            list: true,
            fields: [
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "caption", label: "Caption" },
              { type: "string", name: "alt", label: "Alt Text" }
            ]
          }
        ]
      },
      {
        name: "contact",
        label: "Contact Information",
        path: "src/content",
        format: "json",
        match: { include: "contact" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "sectionTitle", label: "Section Title" },
          { type: "string", name: "sectionSubtitle", label: "Section Subtitle", ui: { component: "textarea" } },
          {
            type: "object",
            name: "company",
            label: "Company Details",
            fields: [
              { type: "string", name: "name", label: "Company Name" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "address", label: "Address", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "Social Media Links",
            list: true,
            fields: [
              { type: "string", name: "platform", label: "Platform" },
              { type: "string", name: "url", label: "URL" },
              { type: "string", name: "icon", label: "Icon (emoji)" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
