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
            size="sm">editar</q-btn>
            <q-btn
            rounded
            color="red"
            size="sm">excluir</q-btn>
          </q-td>
        </q-tr>
      </template>


    </q-table>
    <q-dialog v-model="createUserDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Criar usuário</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <q-input
              filled
              v-model="fullName"
              label="Nome completo"
              class="q-pb-lg"
              :rules="[val => !!val || 'Campo obrigatório', val => val.length >= 5 || 'Este campo deve possuir pelo menos 5 caracteres']" />
            <q-input
              filled
              v-model="cpf"
              label="CPF"
              mask="###.###.###-##"
              fill-mask
              class="q-pb-lg"
              :rules="[val => !!val || 'Campo obrigatório']" />
            <q-input
              filled
              v-model="email"
              label="E-mail"
              type="email"
              class="q-pb-lg"
              :rules="[val => !!val || 'Campo obrigatório']" />
            <q-input
              filled
              v-model="phone"
              label="Telefone"
              type="tel"
              mask="(##) #####-####"
              fill-mask
              class="q-pb-lg"
              :rules="[val => !!val || 'Campo obrigatório']" />
            <q-date
              v-model="birthDate"
              subtitle="Data de nascimento"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            label="Criar usuário"
            size="lg"
            color="green"
            @click="createUser"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import UserService from '../services/user-services';
export default {
  name: 'PageIndex',
  data() {
    return {
      fullName: '',
      cpf: '',
      email: '',
      phone: '',
      birthDate: '',
      createUserDialog: false,
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
    createUser() {
      const newUser = {
        fullName: this.fullName,
        cpf: this.cpf,
        email: this.email,
        phone: this.phone,
        birthDate: this.birthDate
      }

      UserService.createUser(newUser)
        .then(result => {
          UserService.getAllUsers()
            .then(response => {
              this.users = response.data.users
            })
          this.fullName = ''
          this.cpf = ''
          this.email = ''
          this.phone = ''
          this.birthDate = ''
        })

      console.log(newUser)
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
