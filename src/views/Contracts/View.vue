<template>
	<div>
		<v-container style="margin-top: 30px">
			<v-row justify="center" style="margin-bottom: 30px">
				<v-app-bar-title>Crie um novo Contrato</v-app-bar-title>
			</v-row>
			<v-form ref="form" v-model="valid">
				<v-row justify="center">
					<v-col cols="10" md="3">
						<v-text-field v-model="contract.email_contractor" required label="E-mail do contratante*" :rules="emailRules"></v-text-field>
					</v-col>
					<v-col cols="11" md="3">
						<v-text-field v-model="contract.full_name_contractor" label="Nome completo do contratante*" required :rules="othersRules"></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="10" md="3">
						<h6 class="text-center">Selecione o tipo de pessoa*</h6>
						<div class="d-flex justify-center" style="margin-top: 10px">
							<p style="margin: 4px 8px 0 0">Física</p>
							<v-switch v-model="type" class="ma-0" color="black" hide-details></v-switch>
							<p style="margin: 4px 0 0 8px">Jurídica</p>
						</div>
					</v-col>
					<v-col cols="10" md="3" v-if="type">
						<v-text-field v-model="contract.document" required label="Digite seu CNPJ*" v-mask="'##.###.###/####-##'" :rules="othersRules"></v-text-field>
					</v-col>
					<v-col cols="10" md="3" v-if="!type">
						<v-text-field v-model="contract.document" required label="Digite seu CPF*" v-mask="'###.###.###-##'" :rules="othersRules"></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="10" md="3" v-if="properties.length >= 1">
						<v-select v-model="contract.property_id" :items="properties" item-text="road" item-value="id" label="Selecione a propriedade*" required>
							<template v-slot:item="{ item }">
								{{ getText(item) }}
							</template>
						</v-select>
						<small>Somente propriedades sem contratos estão disponíveis</small>
					</v-col>
					<v-col cols="10" md="3" v-else>
						<p>Todas as propriedades cadastradas já tem um contrato</p>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-btn class="mr-4" @click="enviar" autofocus>Enviar</v-btn>
				</v-row>
			</v-form>
		</v-container>
		{{contract}}
	</div>
</template>
<script>
import axios from "axios";
import {mask} from 'vue-the-mask'
import Swal from 'sweetalert2'
export default {
	name: "View",
	directives: {mask},
	data() {
		return {
			valid: true,
			contract: {
				type_document: "PF",
				document: ''
			},
			properties: [],
			type: false,
			emailRules: [
				v => !!v || 'E-mail é obrigatório',
				v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
			],

			othersRules: [
				v => !!v || 'Esse campo é obrigatório'
			],

			items: [
				{state: 'Contratado', abbr: '1'},
				{state: 'Não Contratado', abbr: '0'},
			],
		}
	},
	created() {
		const vm = this;
		axios.get("http://teste-accordous.test/api/properties/property_id_null")
			.then(function (response) {
				vm.properties = response.data;
			})
			.catch(function (error) {
				console.log(error)
				window.alert(error)
			})
	},
	watch: {
		type() {
			if (this.type === true) {
				this.contract.type_document = 'PJ';
			}
			if (this.type === false) {
				this.contract.type_document = 'PF';
			}
		},
	},
	methods: {
		getText(item) {
			return `${item.road} - ${item.number !== null || undefined ? item.number+' - ' : ''} ${item.complement !== null || undefined ? item.complement+' - ' : ''}  ${item.neighborhood}`
		},
		enviar() {
			const vm = this;
			if (this.$refs.form.validate()) {
				axios.post(`http://teste-accordous.test/api/contracts/`, vm.contract)
					.then(function () {
						Swal.fire(
							'Feito!',
							'Contrato criado',
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