import useSupabase from 'src/boot/supabase'
import useAuthUser from './UseAuthUser'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'
import useBrand from 'src/composables/UseBrand'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const brand = ref({
  primary: '',
  secondary: '',
  name: '',
  phone: '',
  paralax_url: '',
})

export default function useApi() {
  const { supabase } = useSupabase()
  const { user } = useAuthUser()
  const route = useRoute()
  const { setBrand } = useBrand()
  const $q = useQuasar()

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select('*')

    if (error) throw error
    return data
  }

  const listPublic = async (table, userId, columnFilter = '', filter = '') => {
    const { data, error } = await supabase.from(table).select('*').eq('user_id', userId).eq(columnFilter, filter)

    if (error) throw error
    return data
  }

  const fetchCount = async (table, userId) => {
    const { data, error, count } = await supabase.from(table).select('*', { count: 'exact' }).eq('user_id', userId)

    if (error) throw error
    return { data, count }
  }

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id)

    if (error) throw error
    return data[0]
  }

  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([{ ...form, user_id: user.value.id }])

    if (error) throw error
    return data
  }

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id })

    if (error) throw error
    return data
  }

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id })

    if (error) throw error
    return data
  }

  const uploadImg = async (file, storage) => {
    const filename = uuidv4()
    const { error } = supabase.storage.from(storage).upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (error) throw error

    return await getUrlPublic(filename, storage)
  }

  const getUrlPublic = async (filename, storage) => {
    const { publicURL, error } = supabase.storage.from(storage).getPublicUrl(filename)
    if (error) throw error

    return publicURL
  }

  const getBrand = async () => {
    // busca o id do usuário
    // tenta primeiro a partir da prop id que está na URL
    // se não, pega o id do usuário logado (se estiver)
    const id = route.params.id || user?.value?.id

    if (id) {
      $q.loading.show({
        backgroundColor: 'dark',
      })
      const { data, error } = await supabase.from('config').select('*').eq('user_id', id)

      if (error) throw error
      if (data.length > 0) {
        brand.value = data[0]
        setBrand(brand.value.primary, brand.value.secondary)
      }
      $q.loading.hide()
      return brand
    }
  }

  return {
    list,
    getById,
    post,
    update,
    remove,
    uploadImg,
    listPublic,
    fetchCount,
    getBrand,
    brand,
  }
}
