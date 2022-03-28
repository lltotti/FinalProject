<template>
<section>
  <div class="container px-4 mx-auto">
    <nav class="flex justify-between items-center py-8">
      <a class="text-gray-600 text-2xl leading-none" href="#">
        <img class="h-8" src="mockup-assets/logos/shuffle-ux.svg" alt="" width="auto">
      </a>
      <div class="lg:hidden">
        <button class="block navbar-burger text-gray-500 hover:text-gray-600 focus:outline-none">
          <svg class="h-4 w-4" fill="currentColor " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <ul class="hidden lg:flex ml-auto mr-10 items-center w-auto space-x-12">
        <li><a class="text-sm text-gray-500 hover:text-gray-700" href="#">About</a></li>
        <li><a class="text-sm text-gray-500 hover:text-gray-700" href="#">Company</a></li>
        <li><a class="text-sm text-gray-500 hover:text-gray-700" href="#">Services</a></li>
        <li><a class="text-sm text-gray-500 hover:text-gray-700" href="#">Testimonials</a></li>
      </ul>
      <a class="hidden lg:block px-6 py-3 text-sm text-gray-500 hover:text-gray-600 font-bold border border-gray-100 hover:border-gray-200 rounded" href="#">Contact Us</a>
     </nav>
    </div>
  </section>

</template>

<script>
export default {

}
</script>

<style>

</style>