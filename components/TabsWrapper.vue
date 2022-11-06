<template lang="">
    <div class="tabs">
        <ul class="tabs__header">
            <li v-for="title in tabTitles" :key="title" @click="selectedTitle = title">
                {{title}}
            </li>
        </ul>
        <slot/>
    </div>
</template>

<script>
export default {
    setup(props, { slots }) {
        const tabTitles = ref(slots.default().map((tab) => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])

        provide("selectedTitle", selectedTitle)

        return {
            selectedTitle,
            tabTitles,
        }
    }
}
</script>
<style lang="">
    
</style>