<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# can u write a detail prompt to convert first image uiux design to 2nd one

Use this prompt (you can adapt tool names like “v0”, “Galileo”, “Framer AI”, “Figma AI” etc. as needed):

***

## Prompt to restyle first UI into second

You are a senior product designer.
Transform the existing “ExpenseWise” expense-tracking dashboard UI (simple, flat design with white canvas and purple sidebar) into a modern SaaS-style dashboard similar to the second reference image (Ticky event dashboard).
Keep all information architecture, data, and user flows exactly the same, but completely upgrade the visual design.

### 1. Layout and structure

- Preserve the current page structure:
    - Left vertical navigation with sections: Dashboard, Expenses, Income, Forecast Expenses, Expense Summary, Income Summary, Reports, Goals, Settings, Account.
    - Top bar with app name/logo on the left, search bar near the center, profile avatar and user name on the right, and “Add Expense” primary action button.
    - Main content area showing the “My Expenses” table with sortable columns and an “Edit” action per row.
- Make the layout full-width, with generous spacing and cards:
    - Wrap the table inside a white or very light card with rounded corners and soft shadow.
    - Add a header strip above the table for filters: search, date range, category dropdown, and “+ Add Expense” button.
    - Show pagination and “Showing X of Y entries” in a neat footer bar under the table.


### 2. Visual style

- Overall look: modern, clean, and SaaS-like, inspired by the second reference:
    - Use a soft, cool color palette with a deep purple / indigo primary (\#4B3FFF or similar), bright accent (\#FFB84D or similar), and lots of white / very light gray backgrounds.[^1]
    - Apply generous border-radius (8–16px), soft shadows, and subtle gradients in headers and primary CTA buttons.[^2][^3]
    - Use light background tint for the whole dashboard (e.g., very light bluish/gray) so cards stand out.
- Sidebar:
    - Make the sidebar slightly wider, with a solid vertical gradient in purple/indigo, similar to the second image.
    - Place the logo and app name “ExpenseWise” at the top with a compact symbol icon.
    - Use modern icons for each menu item (outline icons in white or pastel colors).
    - Highlight the active menu item with a pill-shaped indicator and a lighter purple background.
- Top bar:
    - Convert the plain header into a floating white bar with shadow and rounded corners.
    - Add small icon buttons for notifications, help, and settings like in the second image.
    - Style the profile area with avatar circle, user name, and a small dropdown arrow.
    - Make the “Add Expense” button a strong primary button with gradient or bold fill.
- Table and cards:
    - Use zebra rows or very subtle row hover states.
    - Replace “Edit” text with a rounded icon button (e.g., pencil icon).
    - Improve column headings with a stronger font weight and small sort icons.
    - Add small tag chips for the “Category” column (e.g., “Food”, “Rent”) with colored backgrounds.


### 3. Typography and spacing

- Use a modern, geometric sans-serif typeface (e.g., Inter, SF Pro, Poppins, or similar).[^4]
- Define clear hierarchy:
    - Page title: 20–24px, semi-bold.
    - Section headers: 16–18px, semi-bold.
    - Table body text: 13–14px, regular.
- Use adequate line-height and white space around sections to match the roomy feel of the second UI.
- Ensure text has sufficient contrast against backgrounds for accessibility.[^1][^4]


### 4. Components and interactions

- Navigation:
    - Sidebar items should have hover states, active states with glow or gradient pill, and optional small badges (e.g., “NEW” or counts).
    - Add a collapse/expand icon for the sidebar.
- Filters and search:
    - Replace the basic search input with a pill-shaped search bar with an icon, placeholder text, and subtle border.
    - Add dropdown filters (Category, Date, Amount range) aligned horizontally under the page title.
- Buttons:
    - Primary: solid or gradient purple with white text, large pill shape, subtle shadow.
    - Secondary: white or light gray with purple outline.
    - Include hover and pressed states (slightly darker background, stronger shadow).
- Micro-interactions:
    - Row hover: slightly lift the row card or change background tint.
    - Button hover: change color and shadow elevation.
    - Add subtle focus outlines for keyboard accessibility.


### 5. Extra enhancements (optional but preferred)

- Add a small summary strip above the table with three cards:
    - “Total Expenses This Month”
    - “Top Category”
    - “Average Daily Spend”
Each card follows the modern card style of the second image: icon on the left, main metric, and small trend text.
- Add a breadcrumb under the top bar like: “Expenses / My Expenses”.
- Add a floating circular “+” quick action button in the bottom-right corner for mobile adaptation.
- Prepare the design to be responsive:
    - Sidebar collapses to icons only on smaller widths.
    - Table turns into stacked cards on mobile.


### 6. Output format

- Deliver the redesigned UI as a high-fidelity web dashboard screen that visually matches the style and polish level of the second reference while keeping all content and features from the first screen.
- Clearly describe colors (hex values), font choices, and spacings so developers can implement it.
- If your tool supports it, generate ready-to-edit components (buttons, sidebar, header, table rows) following this system.
<span style="display:none">[^10][^11][^12][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.crema.us/blog/tips-and-best-practices-to-use-color-in-ui

[^2]: https://www.justinmind.com/ui-design/neumorphism

[^3]: https://www.mockplus.com/blog/post/neumorphic-design-examples-ui-kits

[^4]: https://www.kaarwan.com/blog/ui-ux-design/typography-best-practices-for-ui-design?id=785

[^5]: image.jpg

[^6]: image.jpg

[^7]: https://www.quackit.com/ai/prompts/neumorphic_ui_dashboard_ai_prompt.cfm

[^8]: https://webdesign.tutsplus.com/soft-ui-and-neumorphic-ui-kits--cms-36518a

[^9]: https://dribbble.com/tags/neumorphic-dashboard

[^10]: https://miro.com/ai/prompts/ui-design-prompts/

[^11]: https://365webresources.com/neumorphic-neumorphism-design-freebies/

[^12]: https://updivision.com/blog/post/how-to-write-effective-prompts-for-ai-powered-ui-design

