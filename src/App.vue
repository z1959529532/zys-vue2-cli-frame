<template>
    <div id="app">
        <!--    <nav>-->
        <!--      <router-link to="/">Home</router-link> |-->
        <!--      <router-link to="/about">About</router-link>-->
        <!--    </nav>-->
        <router-view/>
    </div>
</template>

<style lang="less">
html,body {
    height: 100%;
    overflow: hidden;
}
body {
    margin: 0;
    background-color: var(--theme-bg);
}
#app {
    height: 100%;
    width: 100%;
    overflow: hidden;
    //font-family: Avenir, Helvetica, Arial, sans-serif;
    //-webkit-font-smoothing: antialiased;
    //-moz-osx-font-smoothing: grayscale;
    //text-align: center;
    //color: #2c3e50;
}
</style>
