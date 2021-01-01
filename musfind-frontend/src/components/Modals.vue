<template>
    <div>
        <b-modal id="modal-delete">
            <p>Вы уверены, что хотите удалить этот пост?</p>
            <template v-slot:modal-footer="{ ok, cancel}">
            <b-button size="sm" variant="success" @click="ok()">
                Удалить
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
                Отмена
            </b-button>
            </template>
        </b-modal>
        <b-modal id="modal-complaint">
            <p>Ваша жалоба на трек отправлена</p>
            <template v-slot:modal-footer="{ok}">
            <b-button size="sm" variant="success" @click="ok()">
                Ок
            </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'Modals'
}
</script>