import { get } from 'lodash-es'

export const genericErrMixin = {
    methods: {
        handleError (err) {
            const message = get(err, 'response.data', err.message)

            this.$message.add({
                message: message.detail ? message.detail : message,
                class: 'is-error',
            })
            throw err
        }
    }
}

// to do: Currently broken
export const genericErrPlugin = {
    install(Vue, options) {
        Vue.$handleErr = (err) => {
            const message = get(err, 'response.data', err.message)

            this.$message.add({
                message: message.detail ? message.detail : message,
                class: 'is-error',
            })
            throw err
        }
    }
}


