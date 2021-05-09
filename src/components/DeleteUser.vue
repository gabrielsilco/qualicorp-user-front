<template>
    <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
            <div class="text-h6">Excluir usuário</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            Deseja realmente excluir <span class="text-bold">{{user.fullName}}</span>?
        </q-card-section>
        <q-card-actions align="center">
                <q-btn
                    label="Cancelar"
                    size="lg"
                    color="grey"
                    @click="cancel"
                />
                <q-btn
                    label="Excluir usuário"
                    size="lg"
                    color="red"
                    @click="deleteUser"
                />
            </q-card-actions>
    </q-card>
</template>

<script>
import UserService from '../services/user-services';
import Swal from 'sweetalert2'
export default {
    name: 'DeleteUser',
    props: {
        user: {
            type: Object
        }
    },
    methods: {
        deleteUser() {
            UserService.deleteUser(this.user._id)
                .then(result => {
                    this.$emit('close-delete-user')
                    Swal.fire("Sucesso", "Usuário excluído.", "success");
                })
                .catch(error => {
                    Swal.fire("Erro", "Não foi possível excluir o usuário.", "error");
                })
        },
        cancel() {
            this.$emit('cancel-delete-user')
        }
    }
}
</script>
