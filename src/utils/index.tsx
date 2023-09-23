import { createSignal } from 'solid-js';
import { JSX } from 'solid-js';
import { render } from 'solid-js/web';

export const defineSolidWebComponent = (
    componentFunction: (props?: any) => JSX.Element,
    webComponentName: string
) => {
    class WebComponent extends HTMLElement {
        private classNameSignal: [() => string | null, (value: string | null) => void];

        constructor() {
            super();

            // get class from web-component node
            this.classNameSignal = createSignal(this.getAttribute("class"));
            // and remove it, to avoid duplication of classes in node and children node
            this.removeAttribute("class");
        }

        connectedCallback() {
            render(() => componentFunction({ class: this.classNameSignal[0]() }), this);
        }

        static get observedAttributes() {
            return ["class"];
        }

        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            if (name === "class") {
                this.classNameSignal[1](newValue);
            }
        }
    }

    if (!customElements.get(webComponentName)) {
        customElements.define(webComponentName, WebComponent);
    }

    return WebComponent;
}
