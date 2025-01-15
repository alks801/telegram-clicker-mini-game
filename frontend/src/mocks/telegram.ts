export const mockTelegram = {
  initData: "mock_init_data",
  initDataUnsafe: {
    user: {
      id: 1,
      first_name: "Test",
      last_name: "User",
      username: "testuser",
    },
  },
  WebApp: {
    ready: () => console.log("Telegram WebApp ready"),
    expand: () => console.log("Telegram WebApp expanded"),
    close: () => console.log("Telegram WebApp closed"),
    showPopup: (params: any) => console.log("Telegram showPopup", params),
    enableClosingConfirmation: () => console.log("Closing confirmation enabled"),
    isExpanded: true,
    version: "6.0",
  },
}
