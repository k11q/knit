<template lang="">
    <div class="tab-content" v-show="title == selectedTitle">
        <slot/>
    </div>
</template>
<script>
export default {
    props: ['title'],
    setup() {
        const selectedTitle = inject('selectedTitle')

        return {
            selectedTitle
        }
    }
    
}
</script>
<style lang="">
    
</style>