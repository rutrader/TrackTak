import Item from "./item";

export default class DropdownItem extends Item {
  dropdown() {}

  getValue(v) {
    return v;
  }

  element(formats) {
    const { tag } = this;
    this.dd = this.dropdown(formats);
    if (this.dd) {
      this.dd.change = (it) => {
        this.change(tag, this.getValue(it));
      };
      return super.element().child(this.dd);
    }
  }

  setState(v) {
    if (v) {
      this.value = v;

      if (this.dd) {
        this.dd.setTitle(v);
      }
    }
  }
}
