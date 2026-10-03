# AI Solutions and industry How fields — manual ACF setup

The frontend mappings are implemented. Create the fields manually in WordPress
**ACF → Field Groups**, enable **Show in REST API**, save the group, then fill and
save each English and German page separately. No PHP installation is required.
These repository changes do not create fields in the live WordPress admin.

## AI Solutions

Apply the AI Solutions group to the English page (`ai-solutions`) **OR** the
German page (`ai-solutions-2`). Add:

| Label                      | Exact field name          | Type      |
| -------------------------- | ------------------------- | --------- |
| Human Decision Heading     | `ready_human_title`       | Text      |
| Human Decision Description | `ready_human_description` | Text Area |
| Final Ready Heading        | `ready_final_title`       | Text      |
| Final Ready Description    | `ready_final_description` | Text Area |

The first two fields control the “AI assists. Humans decide.” section; the next
two control “Ready to see QC Assist in action?”. New fields take priority over
the corresponding values in `ready_content_json`. Empty new fields preserve the
existing JSON values, then the component's default content.

Keep the existing `ready_highlights_json` Text Area for highlight words. Supply an
array of exact phrases in the current page's language, for example
`["Ready", "in action?"]` in English or `["Bereit", "in Aktion?"]` in German.
The German website route `/de/ai-solutions` reads the `ai-solutions-2` entry.

## Industry application pages

In the Applications group, add any missing fields:

| Label                 | Exact field name        | Type                                         |
| --------------------- | ----------------------- | -------------------------------------------- |
| How Title             | `how_title`             | Text                                         |
| How Heading Highlight | `how_heading_highlight` | Text (optional)                              |
| How Items JSON        | `how_items_json`        | Text Area (existing field; do not duplicate) |

Apply the group to these pages using **OR** location rules:

- Retail: `retail`, `retail-2`
- Health & Pharma: `health-pharma`, `health-pharma-2`
- Food & Beverages: `food-beverages`, `food-beverages-2`
- Beauty & Cosmetics: `beauty-cosmetics`, `beauty-cosmetics-2`
- Consumer Goods: `consumer-goods`, `consumer-goods-2`

Suggested How Title: `How Does it Work?` for English and `Wie funktioniert’s?`
for German. The optional highlight field specifies a phrase to highlight;
otherwise the first word is highlighted. Existing `how_heading` is supported as
an alias, but new fields should use `how_title`.

How Items JSON remains an array of steps, for example:

```json
[
  {
    "title": "Zentrale Freigaben",
    "body_html": "Alle Beteiligten arbeiten mit der aktuellen Version.",
    "imageSrc": "/applications/1.svg",
    "iconName": "BadgeCheck",
    "buttonText": "Mehr erfahren",
    "linkUrl": "/de/solutions/artwork-management"
  }
]
```

## German artwork management JSON

In `artwork-management-2`, the published How Items JSON has a missing closing
quote in the Klare Briefings description. Correct that line to:

```json
"description": "Projekte starten mit vollständigen Informationen, zugeschnitten auf Ihre Vorgaben.",
```

The solution adapter now recovers this specific missing-quote error and maps
`imageSrc`, `iconName`, and description aliases consistently. Valid JSON remains
the recommended CMS input.

Deploy the frontend changes after saving fields. Check the EN and DE routes.
