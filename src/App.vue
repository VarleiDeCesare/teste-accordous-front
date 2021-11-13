<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" app>
			<v-sheet color="grey lighten-4" class="pa-4">
				<v-avatar class="mb-4" color="grey darken-1" size="64">
					<img src="@/assets/avatar.png" alt="">
				</v-avatar>
				<div>user.email@exemplo.com</div>
			</v-sheet>
			<v-divider></v-divider>
			<v-list>
				<v-list-item v-for="[icon, text, path] in links" :key="icon" link :to="`${path}`" >
					<v-list-item-icon >
						<v-icon>{{ icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<v-container class="py-8 px-6" fluid>
				<v-row>
					<v-col cols="12">
						<router-view></router-view>
					</v-col>
				</v-row>
				<v-row>
					<small class="text-center alert-to-mobile">Caso esteja em dispositivo pequeno arraste para a esquerda para ver o menu com suas opções</small>
				</v-row>

			</v-container>
		</v-main>

	</v-app>
</template>

<script>
export default {
	data: () => ({
		drawer: null,
		links: [
			['mdi-home', 'Propriedades', "/propriedades"],
			['mdi-domain', 'Cadastrar Propriedade', "/propriedades/create"],
			['mdi-account', 'Cadastrar Contrato', "/contratos/create"],
		],
	}),
}
</script>
<style scoped>
body label {
	margin: 0!important;
}

.alert-to-mobile{
	display: none;
}
@media(max-width: 991px) {
	.alert-to-mobile{
		display: block;
	}
}
</style>