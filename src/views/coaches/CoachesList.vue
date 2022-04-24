<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handlError">
            <p>{{error}}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilter"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button @click="loadCoaches(true)"  mode="outline">Refresh</base-button> 
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Coach</base-button>
                    <base-button v-if="!isCoach && !isLoading && isLoggedIn" to="/register" link>Register as Coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <coach-item 
                    v-for="coach in filtredCoached" 
                    :key="coach.id" 
                    :id="coach.id" 
                    :first-name="coach.firstName" 
                    :last-name="coach.lastName" 
                    :rate = "coach.hourlyRate"
                    :areas="coach.areas"
                    ></coach-item>
                </ul>
                <h3 v-else>No Coaches Found.</h3>
        </base-card>
        </section>
    </div>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';





export default {
components: { CoachItem, CoachFilter  },
    data(){
        return{
            activeFilters:{
                frontend: true,
                backend: true,
                career: true
            },
            isLoading:false,
            error:null
        };
    },
    computed:{
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        },
        filtredCoached(){
            const coaches =  this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => { 
                if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                    return true;
                }
                if(this.activeFilters.backend && coach.areas.includes('backend')){
                    return true;
                }
                if(this.activeFilters.career && coach.areas.includes('career')){
                    return true;
                }
                return false;
            });
        },
        hasCoaches(){
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach(){
            return this.$store.getters['coaches/isCoach'];
        },
    },
    created(){
        this.loadCoaches();
    },
    methods:{
        setFilter(updatedFilters){
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false){
                this.isLoading = true;
                try{
                    await this.$store.dispatch('coaches/loadCoaches',{forceRefresh: refresh});
                }catch(error){
                    error;
                }
                this.error = this.$store.getters['coaches/errors'];
                this.isLoading = false;
        },
        handlError(){
            return this.error = false;
        }
        
        
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>