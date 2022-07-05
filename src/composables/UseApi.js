import useSupabase from 'src/boot/supabase'
import useAuthUser from './UseAuthUser'
import { v4 as uuidv4 } from 'uuid'

export default function useApi() {
  const { supabase } = useSupabase()
  const { user } = useAuthUser()

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select('*')

    if (error) throw error
    return data
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

  return {
    list,
    getById,
    post,
    update,
    remove,
    uploadImg,
  }
}
