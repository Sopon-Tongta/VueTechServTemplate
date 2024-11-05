<template>
  <q-select
    outlined
    dense
    options-dense
    :clearable="selectClearable"
    :class="selectClass"
    v-model="selectValue"
    :options="selectList"
    @clear="onClearEvent"
    @filter="onFilterEvent"
    @update:model-value="
      () => {
        ($refs.selectEl as any).blur();
        onSelectEvent();
      }
    "
    :use-input="search == undefined ? true : search"
    :hide-selected="search == undefined ? true : search"
    :placeholder="placeholder == undefined ? '' : placeholder"
    fill-input
    input-debounce="0"
    map-options
    emit-value
    ref="selectEl"
    color="theme-color"
    popup-content-class="font-thaibev-medium templete_web"
    options-selected-class="font-thaibev-semibold text-green-600"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey font-thaibev-regular"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script lang="ts">
import type { IQSelectField } from "@/interfaces/quasar/IQuasar";
import type { QSelect } from "quasar";
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  props: ["list", "value", "class", "clearable", "search", "placeholder"],
  emits: ["onClear", "onSelect"],
  setup(props, { emit }) {
    const selectList = ref<Array<IQSelectField>>(props.list);
    const selectValue = ref<string>(props.value);
    const selectClass = ref<string>(props.class);
    const selectClearable = ref<boolean>(props.clearable == undefined ? true : props.clearable);

    watch(props, () => {
      selectList.value = props.list;
      selectValue.value = props.value;
      selectClass.value = props.class;
    });

    const onClearEvent = () => {
      selectValue.value = "";
      emit("onClear");
    };

    let timeoutFilterId: number = 0;
    const onFilterEvent = (
      val: string,
      update: (callbackFn: () => void, afterFn?: ((ref: QSelect) => void) | undefined) => void
    ) => {
      clearTimeout(timeoutFilterId);
      timeoutFilterId = window.setTimeout(() => {
        update(() => {
          if (val === "") {
            selectClearable.value = props.clearable == undefined ? true : props.clearable;
            selectList.value = props.list;
          } else {
            selectClearable.value = false;
            const needle = val.toLowerCase();
            selectList.value = props.list.filter(
              (data: IQSelectField) => data.label.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      }, 200);
    };

    const onSelectEvent = () => {
      selectClearable.value = props.clearable == undefined ? true : props.clearable;
      selectValue.value = selectValue.value == null ? "" : selectValue.value;
      const recordSel: IQSelectField = props.list.find(
        (data: IQSelectField) => data.value == selectValue.value
      );
      if (recordSel !== undefined) {
        emit("onSelect", recordSel.label, recordSel.value);
      } else {
        emit("onSelect", "", "");
      }
    };

    return {
      selectList,
      selectValue,
      selectClass,
      selectClearable,
      onClearEvent,
      onFilterEvent,
      onSelectEvent,
    };
  },
});
</script>
