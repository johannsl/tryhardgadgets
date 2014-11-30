Features
HTML:
- Homepage:     Welcome message + video from our coach
- Gadgets:      Section where all gadgets are visible. May add gadgets to 'cart' if user is logged in. All Gadgets are read from XML and are dynamically displayed using JavaScript.
- Storyboard:   Contains a storyboard of the site
- Sources:      References to external libraries used building the site
- Contact:      Contact information for the Tryhard Gadgets crew
- Log in:       Contains a form where the visitor may log in (currently only hard coded a single user/pass combination)
- Register:     Contains a form where the visitor should be able to register as new user account (currently not implemented; GUI only).
- Checkout:     Section where content of 'cart' is displayed as a list (dynamically created, read from cookie), and payment is simulated.
- Logout:       Loads a script which logs the current user out


JavaScript:
- Shopping cart: Able to add gadgets to a shopping cart
- Checkout: Dedicated site to view content of shopping cart; simulates a payment experience
- Login session: Shopping cart, checkout and "Add to cart"-functionality only visible when logged in
- Cross site Cookie-storage: 'cart' and whether user is logged in is stored as cookies; visible where needed. Unique cookie-set for each language.


XML:
- Each gadget is stored as in a single .xml-file (gadgets.xml)
- The content of gadgets.xml is constrained using XML Schema (gadgets.xsd)


Accessibility:
- Two languages; Norwegian, English
- ARIA support
- Tested for Content Tabbing and Screen Reader