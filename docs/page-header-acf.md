# Editable page label beside the blue square

Create one ACF field group named **Page Header** in WordPress. Add:

| Setting       | Value                      |
| ------------- | -------------------------- |
| Field Label   | Page Header Title          |
| Field Name    | `page_header_title`        |
| Field Type    | Text                       |
| Required      | No                         |
| Location      | Post Type is equal to Page |
| Group setting | Show in REST API enabled   |

If this field already exists in an About or another page group, reuse that field
and extend its location rules instead of creating a duplicate with the same name.

Save the group. Edit each page, enter its label in that page's language, and save.
For example, English `food-beverages` can use `Food & Beverages` and German
`food-beverages-2` can use `Lebensmittel & Getränke`. Both translations use the
same field name with separate saved values.

The field controls the small label beside the blue square wherever that label
already appears: About, products, solutions, role/industry applications, AI
Solutions, consulting, resource listing pages, contact, legal pages, and sitemap.
Pages without this label do not gain an additional heading.

The frontend selects the exact WordPress slug, including the existing German
translation slug. Resource listings use `blogs`, `case-studies`, `webinars`,
`downloads`, `guides`, and `video-gallery`. Other standalone pages use their route
slug, such as `contact`, `terms`, or `privacy-notices`. A missing CMS page, empty
field, or failed request preserves the existing label. `CMS_ENABLED=true` enables
these CMS labels, matching the project's existing CMS feature setting.

No PHP installation is needed. The field must be created in WordPress manually,
and the frontend changes must be deployed. This code change does not modify the
live CMS.
