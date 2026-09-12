import { clamp, type Controls } from "./types";
export const deadzone = (v: number, zone = 0.18) =>
  Math.abs(v) < zone ? 0 : (Math.sign(v) * (Math.abs(v) - zone)) / (1 - zone);
export function padControls(pad: Pick<Gamepad, "axes">): Controls {
  return {
    x: deadzone(pad.axes[0] ?? 0),
    y: deadzone(pad.axes[1] ?? 0),
    heat: -deadzone(pad.axes[3] ?? 0),
    pressure: deadzone(pad.axes[2] ?? 0),
    tilt: 0,
  };
}
export class Input {
  keys = new Set<string>();
  touch: Controls = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
  connected = false;
  padName = "";
  private previous: boolean[] = [];
  private previousIndex = -1;
  onAction: (action: string) => void = () => {};
  acceptsGameplay: () => boolean = () => true;
  constructor() {
    window.addEventListener("keydown", (e) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      const key = e.code;
      if (!this.acceptsGameplay() && !["Escape", "KeyM", "KeyH"].includes(key))
        return;
      if (key === "Space" && e.target instanceof HTMLButtonElement) return;
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(
          key,
        ) &&
        !document.querySelector("dialog[open]")
      )
        e.preventDefault();
      this.keys.add(key);
      if (e.repeat) return;
      const action = (
        {
          Space: "spray",
          Escape: "pause",
          KeyR: "restart",
          KeyM: "mute",
          KeyH: "help",
        } as Record<string, string>
      )[key];
      if (action) {
        if (key === "Escape") e.preventDefault();
        this.onAction(action);
      }
    });
    window.addEventListener("keyup", (e) => this.keys.delete(e.code));
    window.addEventListener("blur", () => this.clear());
  }
  clear() {
    this.keys.clear();
    this.touch = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
  }
  poll(): Controls {
    let pads: (Gamepad | null)[] = [];
    try {
      pads = Array.from(navigator.getGamepads?.() ?? []);
    } catch {
      /* Keyboard remains usable. */
    }
    const pad = pads.find((p) => p?.connected && p.mapping === "standard");
    if (this.connected && !pad) {
      this.clear();
      this.onAction("disconnect");
    }
    this.connected = !!pad;
    this.padName = pad
      ? "Controller connected"
      : pads.some(Boolean)
        ? "Controller needs standard mapping"
        : "Keyboard ready";
    const result = pad
      ? padControls(pad)
      : { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
    if (pad) {
      const buttons = pad.buttons.map((b) => b.pressed);
      // A newly connected/selected controller must release its buttons first.
      if (this.previousIndex !== pad.index) this.previous = buttons;
      const actions: Record<number, string> = {
        0: "confirm",
        1: "pause",
        2: "restart",
        3: "help",
        9: "pause",
        12: "nav-up",
        13: "nav-down",
        14: "nav-left",
        15: "nav-right",
      };
      for (const [index, action] of Object.entries(actions))
        if (buttons[+index] && !this.previous[+index]) this.onAction(action);
      result.tilt = Number(!!buttons[5]) - Number(!!buttons[4]);
      this.previous = buttons;
      this.previousIndex = pad.index;
    } else {
      this.previous = [];
      this.previousIndex = -1;
    }
    const key = (code: string) => Number(this.keys.has(code));
    result.x += key("KeyD") - key("KeyA");
    result.y += key("KeyS") - key("KeyW");
    result.heat += key("ArrowUp") - key("ArrowDown");
    result.pressure += key("ArrowRight") - key("ArrowLeft");
    result.tilt += key("KeyE") - key("KeyQ");
    for (const k of Object.keys(result) as (keyof Controls)[])
      result[k] = clamp(result[k] + this.touch[k], -1, 1);
    return result;
  }
}
