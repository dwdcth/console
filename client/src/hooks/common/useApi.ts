import { ref } from 'vue'
export function useApi(api) {
  const loading = ref(false)
  const result = ref(null)
  const error = ref(null)

  const fetchResource = (params) => {
    loading.value = true
    return api(params)
      .then((data) => {
        // 按照约定，api返回的结果直接复制给result
        result.value = data
      })
      .catch((e) => {
        error.value = e
      })
      .finally(() => {
        loading.value = false
      })
  }
  return {
    loading,
    error,
    result,
    fetchResource
  }
}
