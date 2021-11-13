<template>
	<div>
		<v-container>
			<v-row>
				<v-col>
					<table class="table table-striped" v-if="properties.length > 0">
						<thead>
							<tr>
								<th scope="col">E-mail Proprietário
									<!--Alerta gambiarra-->
									<button @click="sort = 'DESC'" v-if="sort === 'ASC'">
										<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
											<path d="M0 0h24v24H0V0z" fill="none"/>
											<path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
										</svg>
									</button>
									<button @click="sort = 'ASC'" v-if="sort === 'DESC'">
										<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
											<path d="M0 0h24v24H0V0z" fill="none"/>
											<path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
										</svg>
									</button>
								</th>
								<th scope="col">Localização</th>
								<th scope="col">Status</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(property,index) in properties" :key="index">
								<td>{{ property.owner_email }}</td>
								<td>{{ `${property.road}, ` }}{{ `${property.number !== null || undefined ? property.number + ', ' : ''} ` }}{{ property.state }}</td>
								<td v-if="property.status">Contratado</td>
								<td v-else>Não Contratado</td>
								<td>
									<a class="btn btn-outline-danger fa-sm mt-2" href="#" @click="apaga(property.id, index)">
										<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FF0000">
											<path d="M0 0h24v24H0V0z" fill="none"/>
											<path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
										</svg>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<h6 v-else class="text-center mt-3">Não tem nenhuma propriedade cadastrada no banco de dados</h6>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
export default {
	name: "Index",
	data() {
		return {
			properties: [],
			order: {
				order: "ASC"
			},
			sort: 'ASC',
		}
	},
	created() {
		const vm = this;
		axios.get("http://teste-accordous.test/api/properties/?order=" + vm.sort)
			.then(function (response) {
				vm.properties = response.data.data;
			})
			.catch(function (error) {
				window.alert(error)
			})
	},
	watch: {
		sort() {
			const vm = this;
			axios.get("http://teste-accordous.test/api/properties/?order=" + this.sort)
				.then(function (response) {
					vm.properties = response.data.data;
				})
				.catch(function (error) {
					window.alert(error)
				})
		}
	},
	methods: {
		apaga(id, index) {
			Swal.fire({
				title: 'Deseja excluir?',
				text: "Essa ação não pode ser revertida",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sim, exclua'
			}).then((result) => {
				if (result.isConfirmed) {
					const vm = this;
					axios.delete(`http://teste-accordous.test/api/properties/${id}`)
						.then(function () {
							Swal.fire(
								'Deletado!',
								'A propriedade com ID ' + id + ' foi excluída!',
								'success'
							)
							vm.properties.splice(index, 1)
						})
						.catch(function (error) {
							window.alert(error)
							console.log(error)
						})

				}
			})
		},
	}
}
</script>

<style scoped>

</style>