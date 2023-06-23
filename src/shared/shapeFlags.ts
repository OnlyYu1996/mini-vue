export const enum ShapeFlags {
  ELEMENT = 1, // 001
  STATEFUL_COMPONENT = 1 << 1, // 010
  TEXT_CHILDREN = 1 << 2, // 0100   1左移两位
  ARRAY_CHILDREN = 1 << 3, //1000   1左移三位
}
