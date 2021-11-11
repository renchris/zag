import { Global } from "@emotion/react"
import { Portal } from "@reach/portal"
import { useMachine } from "@ui-machines/react"
import { popover } from "@ui-machines/web"
import { StateVisualizer } from "components/state-visualizer"
import { useControls } from "hooks/use-controls"
import { useMount } from "hooks/use-mount"
import * as React from "react"
import { popoverStyle } from "../../../shared/style"

export default function Page() {
  const controls = useControls({
    modal: { type: "boolean", defaultValue: false },
    autoFocus: { type: "boolean", defaultValue: true },
    closeOnEsc: { type: "boolean", defaultValue: true },
    portal: { type: "boolean", defaultValue: false },
  })

  const { portal, ...context } = controls.context

  const [state, send] = useMachine(popover.machine, { context })

  const ref = useMount<HTMLDivElement>(send)

  const { triggerProps, popoverProps, closeButtonProps, headerProps } = popover.connect(state, send)

  const Wrapper = portal ? Portal : React.Fragment

  return (
    <>
      <Global styles={popoverStyle as any} />
      <div className="popover" ref={ref}>
        <button data-testid="button-before">Button :before</button>

        <button className="popover__trigger" data-testid="popover-trigger" {...triggerProps}>
          Click me
        </button>
        <Wrapper>
          <div className="popover__content" data-testid="popover-content" {...popoverProps}>
            <div className="popover__title" data-testid="popover-title" {...headerProps}>
              Popover Title
            </div>
            <div className="popover__body" data-testid="popover-body">
              <a>Non-focusable Link</a>
              <a href="#" data-testid="focusable-link">
                Focusable Link
              </a>
              <input data-testid="input" placeholder="input" />
              <button className="popover__close-button" data-testid="popover-close-button" {...closeButtonProps}>
                X
              </button>
            </div>
          </div>
        </Wrapper>

        <span data-testid="plain-text">I am just text</span>
        <button data-testid="button-after">Button :after</button>
      </div>

      <controls.ui />

      <StateVisualizer state={state} />
    </>
  )
}
