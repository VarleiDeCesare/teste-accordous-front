<template>
	<div>
		<v-container style="margin-top: 30px">
			<v-row justify="center" style="margin-bottom: 30px">
				<v-app-bar-title>Adicione um novo Imóvel</v-app-bar-title>
			</v-row>
			<v-form ref="form" v-model="valid">
				<v-row justify="center">
					<v-col cols="12" md="6">
						<v-text-field v-model="property.owner_email" label="E-mail do proprietário*" required :rules="emailRules"></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="10" md="2">
						<v-text-field v-model="property.road" required label="Rua*" :rules="othersRules"></v-text-field>
					</v-col>
					<v-col cols="10" md="4">
						<v-text-field v-model="property.neighborhood" label="Bairro*" required :rules="othersRules"></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="10" md="4">
						<v-text-field v-model="property.city" label="Cidade*" required :rules="othersRules"></v-text-field>
					</v-col>
					<v-col cols="10" md="2">
						<v-text-field v-model="property.state" label="Estado*" required :rules="othersRules"></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="8" md="1">
						<v-text-field v-model="property.number" label="Número" required></v-text-field>
					</v-col>
					<v-col cols="10" md="3">
						<v-text-field v-model="property.complement" label="Complemento" required></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-btn class="mr-4" @click="enviar">Enviar</v-btn>
				</v-row>
			</v-form>
		</v-container>
	</div>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'
export default {
	name: "View",

	data() {
		return {
			valid: true,
			property: {
				owner_email: "",
				status: 0
			},
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			othersRules: [
				v => !!v || 'Esse campo é obrigatório'
			],
		}
	},
	methods: {
		enviar() {
			const vm = this;
			if (this.$refs.form.validate()) {
				axios.post(`http://teste-accordous.test/api/properties/`, vm.property)
					.then(function () {
						setTimeout(2000)
						Swal.fire(
							'Feito!',
							'Propriedade criada',
							'success'
						)
						window.location.replace('/propriedades/')
					})
					.catch(function (error) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Ocorreu um erro ' + error
						})
					})
			}
		},
	},
}
</script>

<style scoped>

</style>