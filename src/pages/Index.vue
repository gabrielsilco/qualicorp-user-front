<template>
  <q-page class="q-pa-md">
    <q-btn
    color="green"
    @click="createUserDialog = !createUserDialog">Novo Usuário</q-btn>

    <q-table
      title="Usuários"
      :data="users"
      :columns="columns"
      row-key="name"
      class="q-mt-md"
      
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <!-- <q-th auto-width></q-th> -->
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" align="center">
          <q-td key="fullName">
            {{ props.row.fullName }}
          </q-td>
          <q-td key="cpf">
            {{ props.row.cpf }}
          </q-td>
          <q-td key="email">
            {{ props.row.email }}
          </q-td>
          <q-td key="phone">
            {{ props.row.phone }}
          </q-td>
          <q-td key="birthDate">
            {{ props.row.birthDate }}
          </q-td>
          <q-td key="actions">
            <q-btn
            rounded
            color="primary"
            @click="editUser(props.row)"
            size="sm">editar</q-btn>
            <q-btn
            rounded
            color="red"
            @click="deleteUser(props.row)"
            size="sm">excluir</q-btn>
          </q-td>
        </q-tr>
      </template>


    </q-table>
    <q-dialog v-model="createUserDialog">
      <CreateUser @close-create-user="closeCreateUserDialog"/>
    </q-dialog>

    <q-dialog v-model="editUserDialog">
      <EditUser
        @close-edit-user="closeEditUserDialog"
        :user="userToEdit" />
    </q-dialog>

    <q-dialog v-model="deleteUserDialog">
      <DeleteUser
        @close-delete-user="closeDeleteUserDialog"
        @cancel-delete-user="deleteUserDialog = false"
        :user="userToDelete" />
    </q-dialog>
  </q-page>
</template>

<script>
import UserService from '../services/user-services';
import CreateUser from '../components/CreateUser';
import EditUser from '../components/EditUser';
import DeleteUser from '../components/DeleteUser';

export default {
  components: {CreateUser, EditUser, DeleteUser},
  name: 'PageIndex',
  data() {
    return {
      createUserDialog: false,
      editUserDialog: false,
      deleteUserDialog: false,
      userToEdit: null,
      userToDelete: null,
      users: [],
      columns: [
        {
          name: 'fullName',
          required: true,
          label: 'Nome completo',
          align: 'center',
          field: 'fullName',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'cpf', align: 'center', label: 'CPF', field: 'cpf', sortable: true },
        { name: 'email', label: 'E-mail', align: 'center', field: 'email', sortable: true },
        { name: 'phone', label: 'Telefone', align: 'center', field: 'phone' },
        { name: 'birthDate', label: 'Data de nascimento', align: 'center', field: 'birthDate' },
        { name: "actions", label: "Ação", field: "acao", align: 'center' }
      ]
    }
  },
  methods: {
    editUser(user) {
      this.userToEdit = user;
      this.editUserDialog = true;
    },
    deleteUser(user) {
      this.userToDelete = user;
      this.deleteUserDialog = true;
    },
    closeCreateUserDialog() {
      this.createUserDialog = false
      UserService.getAllUsers()
      .then(response => {
        this.users = response.data.users
      })
    },
    closeEditUserDialog() {
      this.editUserDialog = false
      UserService.getAllUsers()
      .then(response => {
        this.users = response.data.users
      })
    },
    closeDeleteUserDialog() {
      this.deleteUserDialog = false
      UserService.getAllUsers()
      .then(response => {
        this.users = response.data.users
      })
    },
    validarCPF(val){
    var soma = 0;
    var resto;
    var inputCPF = val

    if(inputCPF == '00000000000') return false;
    for(i=1; i<=9; i++) soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(9, 10))) return false;

    soma = 0;
    for(i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i-1, i))*(12-i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
}
  },
  created() {
    UserService.getAllUsers()
      .then(response => {
        this.users = response.data.users
      })
  }
}
</script>
