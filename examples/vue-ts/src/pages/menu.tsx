import { injectGlobal } from "@emotion/css"
import * as Menu from "@ui-machines/menu"
import { normalizeProps, useMachine, useSetup, VuePropTypes } from "@ui-machines/vue"
import { computed, defineComponent, h, Fragment } from "vue"
import { menuStyle } from "../../../../shared/style"
import { StateVisualizer } from "../components/state-visualizer"

injectGlobal(menuStyle)

export default defineComponent({
  name: "Menu",
  setup() {
    const [state, send] = useMachine(
      Menu.machine.withContext({
        onSelect: console.log,
      }),
    )

    const ref = useSetup({ send, id: "1" })

    const menuRef = computed(() => Menu.connect<VuePropTypes>(state.value, send, normalizeProps))

    return () => {
      const { triggerProps, contentProps, getItemProps } = menuRef.value
      return (
        <div>
          <button ref={ref} {...triggerProps}>
            Click me
          </button>
          <ul style={{ width: "300px" }} {...contentProps}>
            <li {...getItemProps({ id: "menuitem-1" })}>Edit</li>
            <li {...getItemProps({ id: "menuitem-2" })}>Duplicate</li>
            <li {...getItemProps({ id: "menuitem-3" })}>Delete</li>
          </ul>

          <StateVisualizer state={state} />
        </div>
      )
    }
  },
})
