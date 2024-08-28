import { emit } from "process";
import { RefObject } from "react";
import useEventListener from "./useEventListener";

type Handler = (event: MouseEvent) => void;

enum ClickOutSide {
  True,
  False,
}

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEventListener(mouseEvent, (event) => {
    const isClickOutside: ClickOutSide[] = [];
    refs.forEach((ref) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        isClickOutside.push(ClickOutSide.False);
        //return
      } else {
        isClickOutside.push(ClickOutSide.True);
      }

    // console.log('isClickOutside::', el, isClickOutside);

    });


    if (isClickOutside.every((element) => element === ClickOutSide.True)) {
      handler(event);
    }
  });
}

export default useOnClickOutside;
