<template>
  <VDatePicker
    v-model="dateTimeValue"
    color="green"
    :masks="formatInput"
    :locale="locale"
    :popover="false"
    :mode="mode"
    is24hr
    hide-time-header
  >
    <template #default="{ togglePopover, inputValue, inputEvents }">
      <label :class="labelCss.map((m) => m).join(' ')">
        <div class="q-field__inner relative-position col self-stretch">
          <div class="q-field__control relative-position row no-wrap" tabindex="-1">
            <div
              class="q-field__control-container col relative-position row no-wrap q-anchor--skip"
            >
              <input
                class="q-field__native q-placeholder"
                tabindex="0"
                type="text"
                :placeholder="formatInput.input"
                :value="inputValue"
                v-on="inputEvents"
                @focus="onFocus"
                @blur="onBlur"
                readonly
              />
            </div>
            <div class="q-field__append q-field__marginal row no-wrap items-center q-anchor--skip">
              <button
                class="q-icon notranslate material-icons q-field__focusable-action"
                tabindex="0"
                type="button"
                @click="() => onClear()"
              >
                cancel
              </button>
            </div>
            <div class="q-field__append q-field__marginal row no-wrap items-center">
              <i
                class="q-icon notranslate material-icons cursor-pointer"
                aria-hidden="true"
                role="presentation"
                @click="() => togglePopover()"
              >
                event
              </i>
            </div>
          </div>
        </div>
      </label>
    </template>
  </VDatePicker>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref, watch } from "vue";
export default defineComponent({
  props: ["value", "isDateTime"],
  emits: ["onUpdate"],
  setup(props, { emit }) {
    const locale = ref<string>("th-TH");
    const dateTimeValue = ref<Date | null>(null);
    const mode = ref<string>("date");
    const formatInput = ref({
      input: "DD/MM/YYYY",
    });
    const labelCss = ref<Array<string>>([]);

    onBeforeMount(() => {
      labelCss.value.push("q-field");
      labelCss.value.push("row");
      labelCss.value.push("no-wrap");
      labelCss.value.push("items-start");
      labelCss.value.push("q-field--outlined");
      labelCss.value.push("q-input");
      labelCss.value.push("q-field--float");
      labelCss.value.push("q-field--dense");
    });

    onMounted(() => {
      if (props.isDateTime == "" || props.isDateTime) {
        mode.value = "dateTime";
        formatInput.value.input = "DD/MM/YYYY hh:mm";
      }

      if (props.value !== undefined && props.value !== null && props.value !== "") {
        let sDate = props.value;
        let sTime = "";

        if (sDate.includes(" ")) {
          [sDate, sTime] = sDate.split(" ");
        }

        if (sDate.includes("/")) {
          const [date, month, year] = sDate.split("/").map(Number);

          if (!Number.isNaN(date) && !Number.isNaN(month) && !Number.isNaN(year)) {
            dateTimeValue.value = new Date(year, month - 1, date);

            if (sTime.includes(":")) {
              const [hour, minute] = sTime.split(":").map(Number);

              if (!Number.isNaN(hour) && !Number.isNaN(minute)) {
                dateTimeValue.value.setHours(hour, minute, 0);
              }
            }
          } else {
            throw new Error("Invalid date format: " + sDate);
          }
        } else {
          throw new Error("Invalid date format: " + sDate);
        }
      }
    });

    const onFocus = () => {
      if (!labelCss.value.includes("q-field--focused")) {
        labelCss.value.push("q-field--focused");
      }
      if (!labelCss.value.includes("q-field--highlighted")) {
        labelCss.value.push("q-field--highlighted");
      }
    };

    const onBlur = () => {
      const fi = labelCss.value.indexOf("q-field--focused");
      if (fi > -1) {
        labelCss.value.splice(fi, 1);
      }
      const hi = labelCss.value.indexOf("q-field--highlighted");
      if (hi > -1) {
        labelCss.value.splice(hi, 1);
      }
    };

    const onClear = () => {
      dateTimeValue.value = null;
    };

    watch(dateTimeValue, () => {
      const dateValue = dateTimeValue.value ?? null;

      if (dateValue !== null) {
        const date = dateValue.getDate().toString().padStart(2, "0");
        const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
        const year = dateValue.getFullYear();
        const dateResult = `${date}/${month}/${year}`;

        if (props.isDateTime == "" || props.isDateTime) {
          const hour = dateValue.getHours().toString().padStart(2, "0");
          const minute = dateValue.getMinutes().toString().padStart(2, "0");
          const timeResult = `${hour}:${minute}`;
          const result = `${dateResult} ${timeResult}`;
          emit("onUpdate", result);
        } else {
          emit("onUpdate", dateResult);
        }
      } else {
        emit("onUpdate", "");
      }
    });

    return {
      locale,
      mode,
      labelCss,
      dateTimeValue,
      formatInput,
      onFocus,
      onBlur,
      onClear,
    };
  },
});
</script>
