<template>
    <q-card style="width: 700px; max-width: 80vw;">
        <q-form @submit.prevent="createUser">
            <q-card-section>
                <div class="text-h6">Criar usuário</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
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
                    class="q-pb-lg"
                    :rules="[val => !!val || 'Campo obrigatório', val => val.length == 14 || 'CPF Inválido']" />
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
                    class="q-pb-lg"
                    :rules="[val => !!val || 'Campo obrigatório', val => val.length == 15 || 'Telefone Inválido']" />
                <q-date
                    v-model="birthDate"
                    subtitle="Data de nascimento"
                />
            </q-card-section>

            <q-card-actions align="center">
                <q-btn
                    label="Criar usuário"
                    size="lg"
                    color="green"
                    type="submit"
                />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script>
import UserService from '../services/user-services';
import Swal from 'sweetalert2'
export default {
  name: 'PageIndex',
  data() {
    return {
      fullName: '',
      cpf: '',
      email: '',
      phone: '',
      birthDate: ''
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
          this.$emit('close-create-user')
          Swal.fire("Sucesso", "Usuário criado.", "success");

          this.fullName = ''
          this.cpf = ''
          this.email = ''
          this.phone = ''
          this.birthDate = ''
        })
        .catch(error => {
          Swal.fire("Erro", "Não foi possível criar o usuário", "error");
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
  }
}
</script>
