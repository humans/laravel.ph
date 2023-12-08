<script setup lang="ts">
import { useForm } from "@inertiajs/vue3"
import { SubmitButton } from "@primitives/button"
import { ContentContainer } from "@primitives/content-container"
import { Field } from "@primitives/field"
import { CsrfField } from "@primitives/form"
import { Input } from "@primitives/input"

type Props = {
    links: { [key: string]: string }
}

const { links } = defineProps<Props>()

const form = useForm({
    full_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
})

function submit() {
    if (form.processing) {
        return
    }

    form.post(links.store_path)
}
</script>

<template>
    <div class="[ py-12 ]">
        <ContentContainer wrap="dialog">
            <h1 class="[ text-4xl font-bold tracking-tighter ]">Create an account</h1>

            <form :action="links.store_path" method="POST" @submit.prevent="submit" class="[ grid gap-6 mt-4 ]">
                <CsrfField />

                <Field id="full_name" label="Full Name" :error="form.errors.full_name">
                    <Input name="full_name" type="text" v-model="form.full_name" />
                </Field>

                <Field id="username" label="Username" :error="form.errors.username">
                    <Input name="username" type="text" v-model="form.username" />
                </Field>

                <Field id="email" label="Email address" :error="form.errors.email">
                    <Input name="email" type="text" v-model="form.email" />
                </Field>

                <Field id="password" label="Password" :error="form.errors.password">
                    <Input name="password" type="password" v-model="form.password" />
                </Field>

                <Field id="password_confirmation" label="Repeat your password">
                    <Input name="password_confirmation" type="password" v-model="form.password_confirmation" />
                </Field>

                <div class="[ flex justify-end mt-4 ]">
                    <SubmitButton :processing="form.processing">Create your account</SubmitButton>
                </div>
            </form>
        </ContentContainer>
    </div>
</template>

<style scoped></style>
