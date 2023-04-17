export const updateStyle = (
  element: ChildNode | HTMLElement | null | undefined,
  style: Partial<CSSStyleDeclaration>
) => {
  if (!element) {
    return;
  }

  const node = element as HTMLElement;
  for (const property in style) {
    node.style[property] = style[property] || "";
  }
};

export const updateProperty = (
  element: HTMLElement | null | undefined,
  style: Record<string, string>
) => {
  if (!element) {
    return;
  }

  for (const property in style) {
    element.style.setProperty(property, style[property]);
  }
};
