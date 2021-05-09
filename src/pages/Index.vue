<template>
  <q-page class="q-pa-md">
    <q-btn
    color="green">Novo Usuário</q-btn>
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
          <!-- <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'"></q-btn>
          </q-td> -->
          <!-- <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td> -->
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
  </q-page>
</template>

<script>
import UserService from '../services/user-services';
export default {
  name: 'PageIndex',
  data() {
    return {
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
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
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
