import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import type { IFileStorageProvider } from '@telepetros/core/interfaces'
import type { UploadFolder } from '@telepetros/core/types'

import { ENV } from '@/constants'
import { Encryptor } from '@/utils'
import { StorageError } from '@telepetros/core/errors'

export class SupabaseFileStorageProvider implements IFileStorageProvider {
  private static readonly BUCKET_NAME = 'storage'
  private static readonly CDN_URL =
    'https://pxilakunrtybicgjjcbr.supabase.co/storage/v1/object/public/storage'
  private readonly supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(ENV.supabaseUrl, ENV.supabaseAnonKey)
  }

  async upload(
    folder: UploadFolder,
    fileBuffer: Buffer,
    fileExtension: string,
  ): Promise<{ fileUrl: string; fileId: string }> {
    const encryptor = new Encryptor()
    const id = encryptor.generateRandomId()

    const { data, error } = await this.supabase.storage
      .from(SupabaseFileStorageProvider.BUCKET_NAME)
      .upload(`${folder}/${id}.${fileExtension}`, fileBuffer)

    if (error) throw new StorageError(error.message)

    return {
      fileUrl: `${SupabaseFileStorageProvider.CDN_URL}/${folder}/${id}.${fileExtension}`,
      fileId: data.path,
    }
  }

  async remove(fileId: string): Promise<void> {
    const { error } = await this.supabase.storage
      .from(SupabaseFileStorageProvider.BUCKET_NAME)
      .remove([fileId])

    if (error) throw new StorageError(error.message)
  }
}
